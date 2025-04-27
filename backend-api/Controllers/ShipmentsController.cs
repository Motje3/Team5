using backend_api.DTOs;
using backend_api.Models;
using backend_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShipmentsController : ControllerBase
    {
        private readonly IShipmentService _service;

        public ShipmentsController(IShipmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shipment>>> GetAll()
        {
            var shipments = await _service.GetAllShipmentsAsync();
            return Ok(shipments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shipment>> GetById(int id)
        {
            var shipment = await _service.GetShipmentByIdAsync(id);
            if (shipment == null)
            {
                return NotFound();
            }

            return Ok(shipment);
        }

        [HttpPut("{id}/status")]
        [Authorize]
        public async Task<ActionResult<Shipment>> UpdateStatus(int id, StatusUpdateDto dto)
        {
            // get the username from the JWT / cookie
            var username = User.Identity?.Name ?? "unknown";

            var updated = await _service.UpdateStatusAsync(id, dto.Status, username);
            if (updated == null) return NotFound();
            return Ok(updated);
        }


    }
}
