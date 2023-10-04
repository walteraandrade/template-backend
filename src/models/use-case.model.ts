export interface UseCase<T> {
  exec: (args: any) => T | null
}
