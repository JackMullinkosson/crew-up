import moment from "moment";
import ResponseButtons from "./ResponseButtons";
import Confirmed from "./Confirmed";
import Declined from "./Declined";
import Toast from "./Toast";
const BASE_URL = "http://localhost:3000/";

export default async function Page({ params }: any) {
  const projectId = parseInt(params.id);

  async function getProjectById() {
    const res = await fetch(`${BASE_URL}api/getProjectById/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return await res.json();
    } else {
      return null;
    }
  }

  async function getPersonById() {
    const res = await fetch(`${BASE_URL}api/getPersonById/${params.person}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }

  const project = await getProjectById();
  const ownerId = project.ownerId;
  const person = await getPersonById();
  const goToId = person.goToId;
  const roleId = person.roleId;
  const status = person && person.status ? person.status : null;

  return (
    <main className="flex justify-center px-16 flex-col py-12 lg:py-16 lg:px-24">
      {status === "Confirmed" ? <Toast status={status} /> : null}
      {status === "Declined" ? <Toast status={status} /> : null}
      <div className="w-3/4 py-6 flex flex-row items-center justify-evenly">
        <h1 className="text-6xl font-bold">{project.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 ml-6 w-1/2">
          {moment(project.startDate).format("MMMM Do YYYY")} -{" "}
          {moment(project.endDate).format("MMMM Do YYYY")}
        </p>
      </div>
      <div className="w-3/4 py-6 flex flex-row items-center shrink-0 grow-0 justify-between">
        <h4 className="text-xl text-gray-700 font-bold w-1/3">Logline:</h4>
        <p className="mr-0 ml-auto w-2/3">{project.logLine}</p>
      </div>
      {project.dayDetails.map((day, index) => {
        return (
          <>
            <div className="w-3/4 py-6 flex flex-row items-center justify-between shrink-0 grow-0">
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-l font-bold text-gray-700">
                  Day {index + 1}:
                </h5>
                <p>{moment(day.startTime).format("MMMM Do YYYY")}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-l font-bold text-gray-700">Call Time:</h5>
                <p>{moment(day.startTime).format("LT")}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-l font-bold text-gray-700">Wrap Time:</h5>
                <p>{moment(day.endTime).format("LT")}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-l font-bold text-gray-700">Location:</h5>
                <p>{day.location}</p>
              </div>
            </div>
          </>
        );
      })}
      {status !== "Confirmed" && status !== "Declined" ? (
        <ResponseButtons
          personId={params.person}
          project={project}
          ownerId={ownerId}
          roleId={roleId}
          goToId={goToId}
        />
      ) : null}
      {status === "Confirmed" ? (
        <Confirmed
          project={project}
          ownerId={ownerId}
          roleId={roleId}
          personId={params.person}
        />
      ) : null}
      {status === "Declined" ? <Declined /> : null}
    </main>
  );
}
