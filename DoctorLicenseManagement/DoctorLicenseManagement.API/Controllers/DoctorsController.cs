using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DoctorLicenseManagement.Application.Services;
using DoctorLicenseManagement.Domain.Entities;

namespace DoctorLicenseManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly DoctorService _service;

        public DoctorsController(DoctorService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string? search, int? status)
        {
            try
            {
                return Ok(await _service.GetDoctors(search, status));
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Doctor doctor)
        {
            try
            {
                await _service.Create(doctor);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _service.SoftDelete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
