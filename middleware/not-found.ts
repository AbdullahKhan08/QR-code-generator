export const notFound = (req: any, res: any) => {
  res.status(404).send('Route not found')
}
