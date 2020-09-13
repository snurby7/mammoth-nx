import { PieDatum, ResponsivePie } from '@nivo/pie'
import { observer } from 'mobx-react'
import moment from 'moment'
import React from 'react'
import { ITransactionInstance } from '../../models'

interface IPieSlice extends PieDatum {
  id: string
  label: string
  value: number
}

interface ICategoryBreakdownProps {
  transactions: ITransactionInstance[]
}

const today = new Date()
const monthStart = new Date()
monthStart.setDate(1)

export const CategoryBreakdown = observer(({ transactions }: ICategoryBreakdownProps) => {
  // TODO: Enable this to support breakdown over a few different periods. Current Month, past 3 months, past 6 months
  let accumulatedTotal = 0
  const transactionsInRangeRecordMap = transactions
    .filter((transaction) => {
      const { date } = transaction
      const isCorrectMonth = date.month === today.getMonth() + 1
      const isPastTransaction = date.day <= today.getDate()
      const isCorrectYear = date.year === today.getFullYear()
      const isOutflow = transaction.outflow <= 0
      return isCorrectMonth && isPastTransaction && isCorrectYear && isOutflow
    })
    .reduce((record, transaction) => {
      const outflowAbs = Math.abs(transaction.outflow)
      if (record[transaction.categoryId.id]) {
        record[transaction.categoryId.id].value += outflowAbs
      } else {
        record[transaction.categoryId.id] = {
          id: transaction.categoryId.id,
          label: transaction.categoryId.name,
          value: outflowAbs,
        }
      }
      accumulatedTotal += outflowAbs
      return record
    }, {} as Record<string, IPieSlice>)

  return (
    <div style={{ height: 400 }}>
      <span>
        Total Spending between {moment(monthStart).format('MM/DD/YYYY')} -{' '}
        {moment(today).format('MM/DD/YYYY')} : <strong>(${accumulatedTotal.toFixed(2)})</strong>
      </span>
      <ResponsivePie
        data={Object.values(transactionsInRangeRecordMap)}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabel={'label'}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        sliceLabel={(data) => `$${data.value}`}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
})
