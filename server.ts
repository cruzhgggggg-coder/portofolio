import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/projects", (req, res) => {
    res.json([
      {
        id: "1",
        title: "Neural Nexus Dashboard",
        category: "UI/UX Design",
        year: "2024",
        description: "A real-time data visualization platform for high-frequency algorithmic trading interfaces.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpXwMS9L46ICh5oCgxtB5szEqlcjW8GG7N3udG_kCQ3ApURGK8FEv-HcHQVBBXNiEuSQ_4l-6l2QIKajr2XRintBMgIrjYSb2j7hldAatFGGmvbxKF4P_CUWQewgZhgExL0iHMBuEkUc6HCr4Y4Z3wG_p-cETGvR2GHPzruA_yTS4FClA0NxyeTgQuTp5aFD9CKl4TIUCmadcVgIWckbE9450iExBOzmgR8xgLR6X6EtmxIp0wilZa5msx1pesm-ER90u6obZX1tmk",
        status: "Active",
        hasModel: true
      },
      {
        id: "2",
        title: "Aether Motion Framework",
        category: "Motion Systems",
        year: "2024",
        description: "A high-performance motion system for fluid digital interfaces.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjzc-yEedztgXl18ccM_6y-LgMaQYCcRrcfGSvYRySh1asgiKzACmf-Ev7na-e2DkmHo9IpkUxeVnkxCOHVLp9SckjrVLkMHRjAbguqlZkWvDEUChFUuQWnwYJf6-6A3HSumHb15yLG-zWHaTBmTli5VDzSRyRrahgX7Qw4npi8u_lSBFpmyEk6ilrYGyrtHUHszyu4o3sEF84qlRBj3hbP68UCtt9IkH0jObKQxwUNq3yscVi-dgC344EkP4UcVFvt4uPcBEZ0WDO",
        status: "Active"
      },
      {
        id: "3",
        title: "Lumina Crystal Identity",
        category: "Brand Strategy",
        year: "2024",
        description: "Visual identity system based on crystalline aesthetics and light refraction.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy5pT4fzcmP5ICAac1j43KsSq4eD3jqfiUyuWs6d_Zle8SlUKf-pPTF6t4CqZuvl5osf-VlnAF_2CcU8147M9mxfddinkv2uqsXzcsk6tYgoMDZeJOLXX_qv0vJFIV43g4q0WchqMmdy-K73NtFfeNDnwx_2oFNVocwgodKGTPd7oOhlq_Az5mqt9GUCoQ-Z1tV0UE5ZzVTT7ZfYH45hkt4s7qtitXhledbJZW2NG3ul_Hs2V9AbQgQfM43x78iobpmYSC6lr8BQyD",
        status: "Active",
        hasModel: true
      },
      {
        id: "4",
        title: "Prism OS Interface",
        category: "UI/UX Design",
        year: "2024",
        description: "Operating system interface design focused on depth and transparency.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAljuXDv93Z6G2s1O_S_eegOAmOQQq2O2bEL2waBzfW8bo_H19UILRNxFZSrC9M4xeteuJOIh11bJ8PCT90VZCMuGgKgf__2lZ3I9Zsizxd54OjqCAl52-VPleubG7n3L2A9vdSxLZRf84jvqiPGI9aufdKlfMch680MwwW3GcGFjcENvCGYpCEBTbLhTWuQ0OMgjAmYNIITMirCsGCuLPzCETOGjP99MSYTThkeJdvBMMiYtnNlAUTd1YJk6SCT-RLk0Dy4-fgEbgp",
        status: "Active"
      }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
