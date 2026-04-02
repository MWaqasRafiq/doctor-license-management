using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DoctorLicenseManagement.Domain.Entities;
using DoctorLicenseManagement.Application.DTOs;

namespace DoctorLicenseManagement.Application.Interfaces
{
    public interface IDoctorRepository
    {
        Task Create(Doctor doctor);
        Task<IEnumerable<DoctorDto>> GetDoctors(string? search, int? status);
        Task<Doctor> GetById(Guid id);
        Task Update(Doctor doctor);
        Task UpdateStatus(Guid id, int status);
        Task SoftDelete(Guid id);
        Task<bool> ExistsByLicense(string license);
    }
}
