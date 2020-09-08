import { DataTypeProvider } from '@devexpress/dx-react-grid'
import { IFormattedNode, ITransactionDetail } from '@mammoth/api-interfaces'
import { TextField } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import React, { useCallback, useState } from 'react'
import { useBudgetStore, useCategoryStore } from '../../hooks'
import { ICategorySnap } from '../../models'

const filter = createFilterOptions<ICategorySnap>()

const CategoryCellFormatter = ({ value: node }: { value: IFormattedNode }) => {
  return <span>{node.value}</span>
}

const CategoryCellEditor = ({ value, onValueChange }) => {
  const node: IFormattedNode = value ?? { id: '', value: '' } // when it's add mode this is undefined
  const categoryStore = useCategoryStore()
  const categoryList: ICategorySnap[] = Array.from(categoryStore.categories.values())
  const { selectedBudget } = useBudgetStore()
  const [selectedCategory, setSelectedCategory] = useState<ICategorySnap | null>(
    categoryList.find((category) => category.id === node.id) ?? null
  )

  const onChange = useCallback(
    (category: ICategorySnap | null) => {
      onValueChange(category?.id)
      setSelectedCategory(category)
    },
    [onValueChange]
  )

  const onAutoCompleteSelection = (category: ICategorySnap | string) => {
    if (typeof category === 'string' || category.id === '') {
      // create the category and set the selectedCategory to the server category
      let categoryName = typeof category === 'string' ? category : category.name
      categoryName =
        categoryName.charAt(categoryName.length - 1) === '"'
          ? categoryName.slice(0, -1)
          : categoryName
      // * Two cases come in here one that looks like 'Create "Category A"' and one that looks like 'Category A'
      categoryStore
        .createCategory({
          name: categoryName.replace('Create "', ''),
          budgetId: selectedBudget!.id,
        })
        .then((category) => {
          onChange(category)
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
      getOptionLabel={(option: ICategorySnap) => option.name}
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
let detailKey: keyof ITransactionDetail

export const CategoryCellTypeProvider = () => {
  return (
    <DataTypeProvider
      for={[(detailKey = 'category')]}
      formatterComponent={CategoryCellFormatter}
      editorComponent={CategoryCellEditor}
    />
  )
}
