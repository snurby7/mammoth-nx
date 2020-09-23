import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { ICategory, IFormattedNode } from '@mammoth/api-interfaces'
import { TextField } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React, { useCallback, useState } from 'react'
import { map } from 'rxjs/operators'
import { useObservable } from '../../../hooks'
import { ITransactionGridRow } from '../../../interface'
import { useBudgetStore } from '../../hooks'
import { rxCategoryApi } from '../../models/category'

const filter = createFilterOptions<ICategory>()

const CategoryCellFormatter = ({ value: node }: { value: IFormattedNode }) => {
  return <span>{node.value}</span>
}

const CategoryCellEditor = ({ value, onValueChange }) => {
  const categoryId: string | undefined = value // when it's add mode this is undefined
  const { result: categoryList } = useObservable(
    rxCategoryApi.categoryIdList$.pipe(
      map((categoryIdList) =>
        categoryIdList.map((categoryId) => rxCategoryApi.getCategory(categoryId).detailRef)
      )
    ),
    []
  )
  const { selectedBudget } = useBudgetStore()
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    categoryId ? rxCategoryApi.getCategory(categoryId).detailRef : null
  )

  const onChange = useCallback(
    (category: ICategory | null) => {
      onValueChange(category?.id)
      setSelectedCategory(category)
    },
    [onValueChange]
  )

  const onAutoCompleteSelection = (category: ICategory | string) => {
    if (typeof category === 'string' || category.id === '') {
      // create the category and set the selectedCategory to the server category
      let categoryName = typeof category === 'string' ? category : category.name
      categoryName =
        categoryName.charAt(categoryName.length - 1) === '"'
          ? categoryName.slice(0, -1)
          : categoryName
      // * Two cases come in here one that looks like 'Create "Category A"' and one that looks like 'Category A'
      rxCategoryApi
        .createCategory({
          name: categoryName.replace('Create "', ''),
          budgetId: selectedBudget!.id,
        })
        .then((category) => {
          onChange(category.detailRef)
        })
    } else {
      onChange(category)
    }
  }

  return (
    <Autocomplete
      id="category-cell"
      value={selectedCategory}
      options={categoryList}
      getOptionLabel={(option: ICategory) => option.name}
      onChange={(_, newValue) => {
        if (typeof newValue === 'string') {
          onAutoCompleteSelection(newValue)
        } else if (newValue && newValue.id === '') {
          onAutoCompleteSelection(newValue)
        } else {
          onChange(newValue)
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)
        if (params.inputValue !== '') {
          filtered.push({
            id: '',
            name: `Create "${params.inputValue}"`,
            budgetId: '',
          })
        }
        return filtered
      }}
      freeSolo
      selectOnFocus
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let detailKey: keyof ITransactionGridRow

export const CategoryCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'categoryId')]}
      formatterComponent={CategoryCellFormatter}
      editorComponent={CategoryCellEditor}
    />
  )
}
