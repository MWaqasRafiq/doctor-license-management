using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoctorLicenseManagement.Application.DTOs
{
    public class DoctorDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string LicenseNumber { get; set; }
        public DateTime LicenseExpiryDate { get; set; }
        public int Status { get; set; }
    }
}
