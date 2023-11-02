import { React, useEffect, useState } from "react";

function Latestbuild() {
  let projectID = localStorage.getItem("ProjectID");
  const setBuildId = (id) => {
    //set build id
    localStorage.setItem("BuildId", id);
  };
  const [build, setBuild] = useState([]);
  const getBuild = () => {
    fetch(
      `https://dashboard-api-backhend-production.up.railway.app/api/build/getallbuild/${projectID}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setBuild(data.Builds));
  };
  useEffect(() => {
    getBuild();
  }, []);

  let updatedArray = [];

  Array.from(build, () => {
    updatedArray = new Array(build[0], build[1], build[2], build[3], build[4]);
  });

  console.log(updatedArray);

  return (
    <div>
      <h4 className="mb-3 mt-3">Build Executed</h4>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Test Name</th>
            <th scope="col">Test Executed</th>
            <th scope="col">Test Status</th>
            <th scope="col">Tests Pass</th>
            <th scope="col">Tests Fail</th>
            <th scope="col">Check Tests</th>
          </tr>
        </thead>
        {updatedArray.reverse().map((element) => (
          <tbody>
            <tr>
              <td>{element.build_data.buildName}</td>
              <td>
                {new Date(
                  element.build_data.buildStartedAt
                ).toLocaleDateString()}
              </td>
              <td>{element.build_data.buildStatus.toUpperCase()}</td>
              <td>
                <span class="badge badge-success">
                  {element.build_data.totalPassAssertion}
                </span>
              </td>
              <td>
                <span class="badge badge-danger">
                  {element.build_data.totalFailAssertion}
                </span>
              </td>
              <td>
                <a
                  href="/buildreport"
                  class="btn btn-primary mt-auto"
                  onClick={() => {
                    setBuildId(element.buildid);
                  }}
                >
                  Test Details
                </a>
              </td>
            </tr>
          </tbody>
        ))}
        <tr>
          <td colspan="5"></td>
          <td>
            <a href="/allbuilds" class="btn btn-secondary mt-auto">
             See More...
            </a>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Latestbuild;
