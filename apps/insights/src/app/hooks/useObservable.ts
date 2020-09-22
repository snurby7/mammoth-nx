import { useEffect, useState } from 'react'
import { Observable, Subscription } from 'rxjs'

interface IRxApiOptions<TResponse, TError> {
  /**
   * Initial value to be set, this can  implicity grab the type but it needs a value.
   */
  initialValue: TResponse

  /**
   * If you need the subscription to hold until some value is set, you can use this.
   */
  beginSubscription?: boolean

  /**
   * onNext will be called whenever `next` is called from the observable.
   */
  onNext?: (result: TResponse) => void

  /**
   * onError gets called whenever the observable emits an event.
   */
  onError?: (result: TError) => void

  /**
   * onComplete is called when the Subscription is completed.
   */
  onComplete?: () => void
}

interface IRxApiResponse<TResponse> {
  isLoading: boolean
  result: TResponse
}

/**
 * useObservable is a wrapper method around an Observable, so you can pass this any time of subject/observable and it will allow you to
 * hook into the methods on it and it will automatically clean up your subscription when the component leaves the DOM
 * @param observable This is what you want to listen to.
 * @param rxApiOptions A collection of options that can be used to get data or information from the observable.
 */
export const useObservable = <TResponse extends any, TError extends any>(
  observable: Observable<TResponse>,
  rxApiOptions: IRxApiOptions<TResponse, TError>
): IRxApiResponse<TResponse> => {
  const [isLoading, setIsLoading] = useState(true)
  const {
    beginSubscription = true, // default to true so subscription happens immediately.
    initialValue,
    onComplete,
    onError,
    onNext,
  } = rxApiOptions
  const [value, setValue] = useState<TResponse>(initialValue)
  useEffect(() => {
    let subscription: Subscription | null = null
    if (beginSubscription) {
      subscription = observable.subscribe({
        next: (result) => {
          setValue(result)
          onNext?.(result)
        },
        error: (error: TError) => {
          onError?.(error)
          setIsLoading(false)
        },
        complete: () => {
          setIsLoading(false)
          onComplete?.()
        },
      })
    }
    return () => {
      subscription?.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beginSubscription])

  return {
    result: value,
    isLoading,
  }
}
