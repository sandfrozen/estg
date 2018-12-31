export default function getNameAndId (name_and_id) {
  const last_dash_id = name_and_id.lastIndexOf('-')
  const id = name_and_id.substring(last_dash_id + 1)
  name_and_id = name_and_id.substring(0, last_dash_id)
  const name = name_and_id.split('-').join(' ')
  return { name: name, id: id }
}
