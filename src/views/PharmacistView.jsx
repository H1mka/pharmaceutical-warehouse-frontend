import { useState, useEffect } from "react";
import mocksMed from "../pages/mockMedications.json";

const PharmacistView = () => {
  const [searchingMed, setSearchingMed] = useState("");
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    setMedications(mocksMed);
  }, []);

  let findedMed = medications.filter((item) => {
    if (searchingMed.length > 0)
      return item.name.toLowerCase().includes(searchingMed.toLowerCase());
  });

  return (
    <div>
      <h1>Medications</h1>
      <input
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
        {findedMed.map((item) => (
          <div key={item.id}>
            <ul>
              <li>{item.name}</li>
              <li>{item.category}</li>
            </ul>
          </div>
        ))}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Expiry</th>
            <th>Location</th>
            <th>ExpiryDate</th>
          </tr>
        </thead>
        <tbody>
          {mocksMed.map((med) => (
            <tr key={med.id} className="hover:bg-base-300">
              <td>{med.name}</td>
              <td>{med.category}</td>
              <td>{med.quantity}</td>
              <td>{med.expiryDate}</td>
              <td>{med.location}</td>
              <td>{med.expiryDate}</td>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PharmacistView;
