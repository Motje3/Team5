using backend_api.Models;

namespace backend_api.Services
{
    public interface ITokenService
    {
        string CreateToken(Profile user);
    }
}
