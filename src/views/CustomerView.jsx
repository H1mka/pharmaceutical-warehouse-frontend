import Table from '../components/Table'
import mocksMed from '../pages/mockMedications.json'

const CustomerView = () => {
  // const headers = Object.keys(data[0]).map((item) => {
  //   return { title: item };
  // });

  return (
    <div>
      <h2>This is Customer page</h2>
      <Table data={mocksMed}></Table>
    </div>
  )
}
export default CustomerView
