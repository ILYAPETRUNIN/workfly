export default (str:string) => {
  return str.replace(/(.{1})(.{3})(.{3})(.{4})/g, '+7 ($2) $3-$4')
}
