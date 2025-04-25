using backend_api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend_api.Services
{
    public interface IShipmentService
    {
        Task<IEnumerable<Shipment>> GetAllShipmentsAsync();
        Task<Shipment?> GetShipmentByIdAsync(int id);
        Task<Shipment?> UpdateStatusAsync(int id, string newStatus);

    }
}
