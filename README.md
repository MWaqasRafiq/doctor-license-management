# Doctor License Management System
A full-stack license management module built with .NET 8 and Next.js 14. This system handles doctor credentialing, automated expiry logic, and advanced filtering using SQL Stored Procedures.

**Setup Instruction:** <br> 
1. Navigate to the /DoctorLicenseManagement folder.
2. Update appsettings.json with your SQL Server Connection String.
3. Run the SQL scripts provided in /Database/Scripts to create the table and Stored Procedures.
4. Run the application using: <br>
      dotnet restore <br>
      dotnet run <br>
1. Navigate to the /doctor-license-frontend folder.
2. Install dependencies: npm install
3. Create a .env.local file and add: NEXT_PUBLIC_API_URL=https://localhost:7025/api
4. Run the development server using: <br>
       npm run dev <br>
