import { Elysia } from "elysia";
import mahasiswa from "./routes/mahasiswa";

const app = new Elysia();
app.get("/mahasiswa", () => mahasiswa);

app.get("/mahasiswa/:id", ({ params }) => {
  const id = Number(params.id);

  const data = mahasiswa.find((mhs) => mhs.id === id);

  return data;
});

app.post("/mahasiswa", ({ body }) => {
  mahasiswa.push(body as {
    id: number;
    nama: string;
    jurusan: string;
  });

  return {
    message: "Mahasiswa berhasil ditambahkan",
    data: body,
  };
});

app.put("/mahasiswa/:id", ({ params, body }) => {
  const id = Number(params.id);

  const index = mahasiswa.findIndex((mhs) => mhs.id === id);

  if (index === -1) {
    return {
      message: "Mahasiswa tidak ditemukan",
    };
  }

  mahasiswa[index] = {
    id: id,
    ...(body as {
      nama: string;
      jurusan: string;
    }),
  };

  return {
    message: "Mahasiswa berhasil diubah",
    data: mahasiswa[index],
  };
});

app.patch("/mahasiswa/:id", ({ params, body }) => {
  const id = Number(params.id);

  const index = mahasiswa.findIndex((mhs) => mhs.id === id);

  if (index === -1) {
    return {
      message: "Mahasiswa tidak ditemukan",
    };
  }

  mahasiswa[index] = {
    ...mahasiswa[index],
    ...(body as Partial<{
      nama: string;
      jurusan: string;
    }>),
  };

  return {
    message: "Mahasiswa berhasil diperbarui",
    data: mahasiswa[index],
  };
});

app.delete("/mahasiswa/:id", ({ params }) => {
  const id = Number(params.id);

  const index = mahasiswa.findIndex((mhs) => mhs.id === id);

  if (index === -1) {
    return {
      message: "Mahasiswa tidak ditemukan",
    };
  }

  mahasiswa.splice(index, 1);

  return {
    message: "Mahasiswa berhasil dihapus",
  };
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});