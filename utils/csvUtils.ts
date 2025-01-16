export function generateCSV(
  users: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    age: number;
    skills: string[] | undefined;
    faculty: string;
    department: string;
    interestReason: string;
    paymentStatus: string;
    comment?: string;
  }[],
  skillName: string
) {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Gender",
    "Age",
    "Skills",
    "Faculty",
    "Department",
    "Interest Reason",
    "Payment Status",
    "Comment",
  ];

  const rows = users.map((user) => [
    user.name,
    user.email,
    user.phone,
    user.gender,
    user.age,
    Array.isArray(user.skills) ? user.skills.join(", ") : "",
    user.faculty,
    user.department,
    user.interestReason,
    user.paymentStatus,
    user.comment || "",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${skillName}_${new Date().toISOString()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
