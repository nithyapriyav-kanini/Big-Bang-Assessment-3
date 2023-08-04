using HotelManagement.Models;
using HotelManagement.Models.DTO;

namespace HotelManagement.Interfaces
{
    public interface IHotelService
    {
        public Task<Hotel?> Add(HotelDTO item);
        public Task<Hotel?> Update(Hotel item);
        public Task<Hotel?> Delete(int Id);
        public Task<Hotel?> Get(int Id);
        public Task<ICollection<HotelDTO>?> GetAll();
    }
}
