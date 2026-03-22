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
let createdCompanyId: string;

beforeAll(async () => {
  await post("/roles", { role_id: 901, role_name: "Organizador Test", role_description: "Rol para pruebas", role_tasks: "crear eventos" });
  const userRes = await post("/usuarios", {
    user_name: "Organizador Empresa",
    user_email: "org_empresa_" + Date.now() + "@test.com",
    user_password: "password123",
    role_id: 901,
  });
  seedUserId = userRes.body?.user_id ?? userRes.body?.id;
});

describe("GET /empresas", () => {
  it("deberia retornar status 200", async () => {
    const { status } = await get("/empresas");
    expect(status).toBe(200);
  });
  it("deberia retornar un arreglo", async () => {
    const { body } = await get("/empresas");
    expect(Array.isArray(body)).toBe(true);
  });
  it("cada empresa deberia tener los campos esperados", async () => {
    const { body } = await get("/empresas");
    if (body.length > 0) {
      expect(body[0]).toHaveProperty("company_id");
      expect(body[0]).toHaveProperty("company_name");
    }
  });
});

describe("POST /empresas", () => {
  it("deberia crear una empresa y retornar 201", async () => {
    const { status, body } = await post("/empresas", { company_name: "TechCorp El Salvador", organizer_id: seedUserId });
    expect(status).toBe(201);
    expect(body).toHaveProperty("company_id");
    createdCompanyId = body.company_id;
  });
  it("la empresa creada deberia aparecer en GET", async () => {
    const { body } = await get("/empresas");
    const found = body.find((e: any) => e.company_id === createdCompanyId);
    expect(found).toBeDefined();
  });
  it("deberia generar un company_id UUID automaticamente", async () => {
    const { body } = await post("/empresas", { company_name: "AutoID Corp", organizer_id: seedUserId });
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(body.company_id).toMatch(uuidRegex);
  });
  it("el API responde sin crash ante organizer_id inexistente", async () => {
    const { status } = await post("/empresas", { company_name: "Empresa Huerfana", organizer_id: "00000000-0000-0000-0000-000000000000" });
    expect(status).toBeLessThan(500);
  });
  it("deberia rechazar payload vacio", async () => {
    const { status } = await post("/empresas", {});
    expect(status).toBeGreaterThanOrEqual(400);
  });
});
