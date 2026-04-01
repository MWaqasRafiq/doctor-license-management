using Dapper;
using System.Data;
using Microsoft.Data.SqlClient;
using DoctorLicenseManagement.Application.Interfaces;
using DoctorLicenseManagement.Application.DTOs;
using DoctorLicenseManagement.Domain.Entities;

namespace DoctorLicenseManagement.Infrastructure.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly string _connectionString;

        public DoctorRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        private IDbConnection Connection => new SqlConnection(_connectionString);

        public async Task<IEnumerable<DoctorDto>> GetDoctors(string? search, int? status)
        {
            using var db = Connection;

            var p = new DynamicParameters();
            p.Add("@Search", search);
            p.Add("@Status", status);

            return await db.QueryAsync<DoctorDto>(
                "sp_GetDoctors",
                p,
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> ExistsByLicense(string license)
        {
            using var db = Connection;

            var sql = "SELECT COUNT(1) FROM Doctors WHERE LicenseNumber=@License AND IsDeleted=0";
            return await db.ExecuteScalarAsync<int>(sql, new { License = license }) > 0;
        }

        public async Task Create(Doctor doctor)
        {
            using var db = Connection;

            var sql = @"INSERT INTO Doctors VALUES
        (@Id,@FullName,@Email,@Specialization,@LicenseNumber,
         @LicenseExpiryDate,@Status,@CreatedDate,0)";

            await db.ExecuteAsync(sql, doctor);
        }

        public async Task<Doctor> GetById(Guid id)
        {
            using var db = Connection;

            return await db.QueryFirstOrDefaultAsync<Doctor>(
                "SELECT * FROM Doctors WHERE Id=@Id AND IsDeleted=0",
                new { Id = id }) ?? new();
        }

        public async Task Update(Doctor doctor)
        {
            using var db = Connection;

            var sql = @"UPDATE Doctors SET
                    FullName=@FullName,
                    Email=@Email,
                    Specialization=@Specialization,
                    LicenseNumber=@LicenseNumber,
                    LicenseExpiryDate=@LicenseExpiryDate,
                    Status=@Status
                    WHERE Id=@Id";

            await db.ExecuteAsync(sql, doctor);
        }

        public async Task SoftDelete(Guid id)
        {
            using var db = Connection;

            await db.ExecuteAsync(
                "UPDATE Doctors SET IsDeleted=1 WHERE Id=@Id",
                new { Id = id });
        }
    }
}
