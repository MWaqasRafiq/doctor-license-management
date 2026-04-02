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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Doctor doctor)
        {
            try
            {
                await _service.Create(doctor);
                return Ok("Record Created successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(string? search, int? status)
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGetById(Guid id)
        {
            try
            {
                return Ok(await _service.GetById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Doctor doctor)
        {
            try
            {
                await _service.Update(doctor);
                return Ok("Record updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(Guid id, int status)
        {
            try
            {
                await _service.UpdateStatus(id,status);
                return Ok("Status updated successfully");
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
                return Ok("Record deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
