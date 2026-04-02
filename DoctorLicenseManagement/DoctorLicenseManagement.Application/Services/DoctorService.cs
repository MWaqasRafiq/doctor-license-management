using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using DoctorLicenseManagement.Application.DTOs;
using DoctorLicenseManagement.Application.Interfaces;
using DoctorLicenseManagement.Domain.Entities;

namespace DoctorLicenseManagement.Application.Services
{
    public class DoctorService
    {
        private readonly IDoctorRepository _repo;

        public DoctorService(IDoctorRepository repo)
        {
            _repo = repo;
        }

        public async Task Create(Doctor doctor)
        {
            if (await _repo.ExistsByLicense(doctor.LicenseNumber))
                throw new Exception("License already exists");

            doctor.Id = Guid.NewGuid();
            doctor.CreatedDate = DateTime.UtcNow;

            await _repo.Create(doctor);
        }

        public async Task<IEnumerable<DoctorDto>> GetDoctors(string? search, int? status)
        {
            return await _repo.GetDoctors(search, status);
        }

        public async Task<Doctor> GetById(Guid id)
        {
            return await _repo.GetById(id);
        }

        public async Task Update(Doctor doctor)
        {
            await _repo.Update(doctor);
        }

        public async Task UpdateStatus(Guid id, int status)
        {
            var doctor = await _repo.GetById(id);

            if (doctor == null)
                throw new Exception("Doctor not found");

            await _repo.UpdateStatus(id, status);
        }

        public async Task SoftDelete(Guid id)
        {
            await _repo.SoftDelete(id);
        }
    }
}
