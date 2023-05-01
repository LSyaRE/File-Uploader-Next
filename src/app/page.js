"use client";
import React, { Fragment } from "react";
import { useState } from "react";
import Image from "next/image";
import { Alert } from "./components/alert";
import { Modal } from "./components/modal";

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
      <div className="flex h-screen justify-center content-center">
        <div className="card w-96 h-fit bg-base-100 shadow-xl">
          <div className="flex card-body justify-center">
            <h1 className="card-title">File Uploader</h1>
            <form onSubmit={handleOnSubmit}>
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                onChange={handleFileChange}
              />
              <div className="card-actions">
                <button type="submit" className="btn">
                  Upload
                </button>
              </div>
            </form>
            {file && (
              <Image
                src={URL.createObjectURL(file)}
                alt="upload file"
                width={256}
                height={256}
              />
            )}
          </div>
        </div>
      </div>
      <Modal/>
    </Fragment>
  );
}

export default HomePage;
