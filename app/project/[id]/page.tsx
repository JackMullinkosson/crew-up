"use client";
import Assigned from "../Assigned";
import Unassigned from "../Unassigned";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
const BASE_URL = "http://localhost:3000/";

export default function Page({ params }: any) {
  const { user, isLoading, error } = useUser();
  const id = parseInt(params.id);
  const [projectLoading, setProjectLoading] = useState(true);
  const [isAssigned, setIsAssigned] = useState(false);

  useEffect(() => {
    if (!user && !error && !isLoading) {
      window.location.assign("http://localhost:3000/api/auth/login");
    }
  }, [user, error, isLoading]);

  useEffect(() => {
    getGoToByProjectId();
  }, []);

  async function getGoToByProjectId() {
    try {
      let res = await fetch(`${BASE_URL}api/getGoToByProjectId/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const test = await res.json();
      if (test) {
        setIsAssigned(true);
      } else {
        setIsAssigned(false);
      }
    } finally {
      setProjectLoading(false);
    }
  }

  if (projectLoading)
    return (
      <main className="flex justify-center px-16 flex-col py-12 lg:py-16 lg:px-24">
        <div className="w-3/4 py-6 flex flex-row items-center">
          <ClipLoader size={35} color={"black"} />
        </div>
      </main>
    );
  if (isAssigned) return <Assigned id={id} />;
  else return <Unassigned id={id} />;
}
