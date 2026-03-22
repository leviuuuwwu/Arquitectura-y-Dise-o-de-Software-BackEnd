import { describe, it, expect, beforeAll } from "vitest";
import { sign } from "jsonwebtoken";

const BASE_URL = "http://localhost:3000";
const token = sign(
  { sub: "test-user", email: "test@test.com", role: "Admin" },
  "super-secreto-theta-2026",
  { expiresIn: "1h" }
);

async function get(path: string) {
  const res = await fetch(BASE_URL + path, {
    headers: { "Authorization": "Bearer " + token }
  });
  return { status: res.status, body: await res.json() };
}

async function post(path: string, payload: unknown) {
  const res = await fetch(BASE_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify(payload),
  });
  return { status: res.status, body: await res.json() };
}

let seedUserId: string;
let seedEventId: string;
let createdRegisterId: string;

beforeAll(async () => {
  const ts = Date.now();
  await post("/roles", { role_id: 902, role_name: "Asistente Test", role_description: "Rol pruebas", role_tasks: "asistir" });
  const userRes = await post("/usuarios", {
    user_name: "Asistente Registro",
    user_email: "asistente_" + ts + "@test.com",
    user_password: "password123",
    role_id: 902,
  });
  seedUserId = userRes.body?.user_id ?? userRes.body?.id;
  await post("/categorias", { category_id: 501, category_name: "Tecnologia " + ts, category_description: "desc" });
  const empresaRes = await post("/empresas", { company_name: "Empresa Registro " + ts, organizer_id: seedUserId });
  const eventoRes = await post("/eventos", {
    event_name: "Evento Prueba " + ts,
    event_category: 501,
    description: "Evento para pruebas",
    start_date: "2025-09-01T09:00:00Z",
    end_date: "2025-09-01T17:00:00Z",
    location: "San Salvador",
    max_attendanse: 100,
    organizer_id: seedUserId,
    company_id: empresaRes.body?.company_id,
  });
  seedEventId = eventoRes.body?.event_id ?? eventoRes.body?.id;
});

describe("GET /registros", () => {
  it("deberia retornar status 200", async () => {
    const { status } = await get("/registros");
    expect(status).toBe(200);
  });
  it("deberia retornar un arreglo", async () => {
    const { body } = await get("/registros");
    expect(Array.isArray(body)).toBe(true);
  });
  it("cada registro deberia tener los campos esperados", async () => {
    const { body } = await get("/registros");
    if (body.length > 0) {
      expect(body[0]).toHaveProperty("register_id");
      expect(body[0]).toHaveProperty("state");
    }
  });
});

describe("POST /registros", () => {
  it("deberia crear un registro y retornar 201", async () => {
    const { status, body } = await post("/registros", { user_id: seedUserId, event_id: seedEventId, state: "confirmado" });
    expect(status).toBe(201);
    expect(body).toHaveProperty("register_id");
    createdRegisterId = body.register_id;
  });
  it("el registro creado deberia aparecer en GET", async () => {
    const { body } = await get("/registros");
    const found = body.find((r: any) => r.register_id === createdRegisterId);
    expect(found).toBeDefined();
  });
  it("deberia guardar el estado correctamente", async () => {
    const { body } = await post("/registros", { user_id: seedUserId, event_id: seedEventId, state: "pendiente" });
    expect(body.state).toBe("pendiente");
  });
  it("deberia asignar register_date automaticamente", async () => {
    const { body } = await post("/registros", { user_id: seedUserId, event_id: seedEventId, state: "confirmado" });
    expect(body.register_date).toBeTruthy();
  });
  it("el API responde sin crash ante payload vacio", async () => {
    const { status } = await post("/registros", {});
    expect(status).toBeLessThan(500);
  });
  it("el API responde sin crash ante user_id inexistente", async () => {
    const { status } = await post("/registros", { user_id: "00000000-0000-0000-0000-000000000000", event_id: seedEventId, state: "confirmado" });
    expect(status).toBeLessThan(500);
  });
});
