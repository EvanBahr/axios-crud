import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [Form, setForm] = useState({
    nama: "",
    kegiatan: "",
  });
  console.log("Render");
  const getData = () => {
    axios.get("http://localhost:3004/posts").then((response) => {
      setData(response.data);
      // console.log(response.data);
    });
  };

  const CreateData = (event) => {
    event.preventDefault();
    if (Form.nama.length >= 1 && Form.kegiatan.length >= 1) {
      event.preventDefault();
      axios.post("http://localhost:3004/posts", Form).then(() => {
        getData();
        // setData(response.data);
      });
    }
  };
  const Hapus = (id) => {
    axios.delete(`http://localhost:3004/posts/${id}`).then((response) => {
      getData();
    });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, []);

  // ketika di dalam kurung kotak ada updatevalue nya, aka useEffect dijalankan ulang
  return (
    <div className="p-8">
      <div>
        <form onSubmit={CreateData}>
          <label name="nama">
            nama:
            <br />
            <input
              type="text"
              className="border p-1 text-black border-black"
              onChange={(event) =>
                setForm({ ...Form, nama: event.target.value })
              }
              // value={newForm.nama}
            />
          </label>
          <br />
          <label name="nama">
            kegiatan:
            <br />
            <input
              type="text"
              className="border p-1 border-black"
              onChange={(event) =>
                setForm({ ...Form, kegiatan: event.target.value })
              }
              // value={newForm.kegiatan}
            />
          </label>
          <br />
          <button
            className="bg-blue-400 p-2 rounded-lg w-32 mt-4"
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
      <div>bismillah</div>
      <button className="h-7 w-7 flex items-center text-center ">GET</button>
      <div className="space-y-2">
        {data.map((v, i) => (
          <div className=" w-56 bg-blue-400 rounded-lg p-3 ">
            <div>urutan: {v.id}</div>
            <div>nama : {v.nama}</div>
            <div>kegiatan : {v.kegiatan}</div>
            <div className="flex justify-center">
              <button
                onClick={(event) => {
                  Hapus(v.id);
                }}
                className="mt-3 p-2 bg-green-300 rounded-lg"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
