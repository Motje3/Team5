using backend_api.Data;
using backend_api.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Services
{
    public class ShipmentService : IShipmentService
    {
        private readonly AppDbContext _context;

        public ShipmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Shipment>> GetAllShipmentsAsync()
        {
            return await _context.Shipments.ToListAsync();
        }

        public async Task<Shipment?> GetShipmentByIdAsync(int id)
        {
            return await _context.Shipments.FindAsync(id);
        }
    }
}
