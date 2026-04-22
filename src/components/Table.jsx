// import { useState } from "react";
const Table = ({ data = [] }) => {
  const headers = Object.keys(data[0]).map((item) => {
    return { title: item };
  });
  //     const [searchingMed, setSearchingMed] = useState("");
  //   let tableSearch = data.filter((item) => {
  //     if (searchingMed.length > 0)
  //       return item.name.toLowerCase().includes(searchingMed.toLowerCase());
  //   });
  return (
    <div>
      {/* <input
        className="input validator outline-none border-[#ecf9ff99]"
        type="search"
        id="search"
        placeholder="Search"
        value={searchingMed}
        onChange={(e) => setSearchingMed(e.target.value)}
      />
      <div>
        {" "}
        <h2>Are you looking for this?</h2>
        {tableSearch.map((item) => (
          <div key={item.id}>
            <ul>
              <li>{item.name}</li>
              <li>{item.category}</li>
            </ul>
          </div>
        ))}
      </div> */}

      <table className="table">
        <thead>
          {headers.map((head) => {
            return <th>{head.title}</th>;
          })}
        </thead>
        <tbody>
          {data.map((dataItem) => {
            return (
              <tr className="hover:bg-base-300">
                {headers.map((headItem) => {
                  return <td>{String(dataItem[headItem.title])}</td>;
                })}
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
