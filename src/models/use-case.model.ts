export interface UseCase<T> {
  exec: (args: any) => Promise<T | null>
}
