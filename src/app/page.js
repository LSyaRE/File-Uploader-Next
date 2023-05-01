"use client";
import React, { Fragment } from "react";
import { useState } from "react";
import Image from "next/image";
import { Alert } from "./components/alert";
import Modal from "./components/modal";

function HomePage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const form = new FormData();
      form.set("file", file);

      const res = await fetch("api/upload", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        console.log("File uploaded successfully");
        Alert("Hello");
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="flex h-screen justify-center items-center">
        <div className="card w-96 h-fit bg-base-100 shadow-xl place-content-center">
          <figure>
            {file && (
              <Image
                src={URL.createObjectURL(file)}
                alt="upload file"
                className="w-screen"
                width={256}
                height={256}
              />
            )}
          </figure>
          <div className="h-fit flex flex-col items-center justify-center">
            <h1 className="card-title m-3">File Uploader</h1>
            <form
              className="flex flex-col items-center space-x-10"
              onSubmit={handleOnSubmit}
            >
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                onChange={handleFileChange}
              />
              <div className="card-actions m-3">
                <button type="submit" className="btn space-y-10">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HomePage;
