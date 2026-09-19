const defaultUsers = [
  { id: 1, name: "Amit Sharma", email: "employee@demo.com", password: "user123", role: "employee", department_id: 101, status: "active" },
  { id: 2, name: "Rajesh Patel", email: "manager@demo.com", password: "manager123", role: "manager", department_id: 101, status: "active" },
  { id: 3, name: "Priya Nair", email: "priya@demo.com", password: "user123", role: "employee", department_id: 102, status: "active" }
];

const defaultDepartments = [
  { id: 101, name: "Engineering", status: "active" },
  { id: 102, name: "Human Resources", status: "active" }
];

const defaultLeaveTypes = [
  { id: 1, name: "Casual Leave", code: "CL", annual_limit: 7 },
  { id: 2, name: "Sick Leave", code: "SL", annual_limit: 5 },
  { id: 3, name: "Earned Leave", code: "EL", annual_limit: 10 },
  { id: 4, name: "Privilege Leave", code: "PL", annual_limit: 5 }
];

const defaultRequests = [
  { id: 5001, employee_id: 1, leave_type_id: 1, start_date: "2026-10-12", end_date: "2026-10-14", total_days: 3, reason: "Family function", status: "Approved", approved_by: 2, created_at: "2026-10-01" },
  { id: 5002, employee_id: 1, leave_type_id: 2, start_date: "2026-11-02", end_date: "2026-11-03", total_days: 2, reason: "Fever and rest", status: "Pending", approved_by: null, created_at: "2026-10-28" }
];

function initializeDB() {
  if (!localStorage.getItem("lp_users")) localStorage.setItem("lp_users", JSON.stringify(defaultUsers));
  if (!localStorage.getItem("lp_departments")) localStorage.setItem("lp_departments", JSON.stringify(defaultDepartments));
  if (!localStorage.getItem("lp_leave_types")) localStorage.setItem("lp_leave_types", JSON.stringify(defaultLeaveTypes));
  if (!localStorage.getItem("lp_requests")) localStorage.setItem("lp_requests", JSON.stringify(defaultRequests));
}
initializeDB();

const DB = {
  get: (key) => JSON.parse(localStorage.getItem(`lp_${key}`)),
  set: (key, data) => localStorage.setItem(`lp_${key}`, JSON.stringify(data))
};

function getSessionUser() {
  const session = localStorage.getItem("lp_session_user");
  if (!session) {
    window.location.href = "index.html";
    return null;
  }
  return JSON.parse(session);
}

function checkAccess(allowedRole) {
  const user = getSessionUser();
  if (user && user.role !== allowedRole) {
    alert("Unauthorized Access Redirecting...");
    window.location.href = user.role === "manager" ? "manager-list.html" : "dashboard.html";
  }
}

function calculateBalances(employeeId) {
  const requests = DB.get("requests");
  const types = DB.get("leave_types");
  const balances = {};

  types.forEach(t => {
    balances[t.id] = { name: t.name, code: t.code, total: t.annual_limit, used: 0 };
  });

  requests.forEach(r => {
    if (r.employee_id === employeeId && r.status === "Approved") {
      if (balances[r.leave_type_id]) {
        balances[r.leave_type_id].used += parseFloat(r.total_days);
      }
    }
  });
  return balances;
}

function getDashboardStats(employeeId) {
  const requests = DB.get("requests").filter(r => r.employee_id === employeeId);
  const balances = calculateBalances(employeeId);
  
  let totalAllowed = 0;
  let totalUsed = 0;
  let pendingCount = 0;

  Object.keys(balances).forEach(id => {
    totalAllowed += balances[id].total;
    totalUsed += balances[id].used;
  });

  requests.forEach(r => {
    if (r.status === "Pending") pendingCount++;
  });

  return {
    total: totalAllowed,
    used: totalUsed,
    remaining: totalAllowed - totalUsed,
    pending: pendingCount
  };
}

function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container") || createToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${type === "success" ? "success" : "danger"} border-0 show`;
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  container.className = "toast-container position-fixed bottom-0 end-0 p-3";
  document.body.appendChild(container);
  return container;
}

function logout() {
  localStorage.removeItem("lp_session_user");
  window.location.href = "index.html";
}
