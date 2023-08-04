using HotelManagement.Interfaces;
using HotelManagement.Models;
using HotelManagement.Models.DTO;
using HotelManagement.Repositories;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace HotelManagement.Services
{
    public class HotelService : IHotelService
    {
        private readonly IHotelRepo<int, Hotel> _hrepo;
        private readonly IRoomRepo<int, Image> _irepo;
        private readonly IRoomRepo<int, Amenity> _arepo;

        public HotelService(IHotelRepo<int,Hotel> hrepo,IRoomRepo<int,Image> irepo,IRoomRepo<int,Amenity> arepo)
        {
            _hrepo = hrepo;
            _irepo = irepo;
            _arepo = arepo;
        }
        public async Task<Hotel?> Add(Hotel item)
        {
            if(item != null)
            {
                var addHotel = await _hrepo.Add(item);
                if (addHotel != null)
                    return addHotel;
            }
            return null;
        }

        public async Task<Hotel?> Delete(int Id)
        {
            var deleteHotel = await _hrepo.Delete(Id);
            if (deleteHotel != null)
                return deleteHotel;
            return null;
        }

        public async Task<Hotel?> Get(int Id)
        {
            var result = await _hrepo.Get(Id);
            if(result != null)
                return result;
            return null;
        }

        public async Task<ICollection<HotelDTO>?> GetAll()
        {
            var result = await _hrepo.GetAll();
            List<HotelDTO> dto = new List<HotelDTO>();
            if (result != null)
            {
                foreach (var item in result)
                {
                    var mapped = await Mapper(item);
                    if (mapped != null)
                        dto.Add(mapped);
                }
                return dto;
            }
            return null;
        }

        public async Task<Hotel?> Update(Hotel item)
        {
            var result = await _hrepo.Update(item);
            if(result != null) 
                return result;
            return null;
        }
        private static Hotel? Mapper(HotelDTO dto)
        {
            Hotel hotel = new Hotel();
            hotel.Id = dto.Id;
            hotel.Name = dto.Name;
            hotel.Description = dto.Description;
            hotel.Email = dto.Email;
            hotel.Address = dto.Address;
            hotel.ContactNumber = dto.ContactNumber;
            hotel.City = dto.City;
            hotel.Country = dto.Country;
            hotel.NumberOfRooms = dto.NumberOfRooms;
            hotel.MaximumPrice = dto.MaximumPrice;
            hotel.MinimumPrice = dto.MinimumPrice;
            return hotel;
        }
        private async Task<HotelDTO?> Mapper(Hotel dto)
        {
            HotelDTO hotel = new HotelDTO();
            hotel.Id = dto.Id;
            hotel.Name = dto.Name;
            hotel.Description = dto.Description;
            hotel.Email = dto.Email;
            hotel.Address = dto.Address;
            hotel.ContactNumber = dto.ContactNumber;
            hotel.City = dto.City;
            hotel.Country = dto.Country;
            hotel.NumberOfRooms = dto.NumberOfRooms;
            hotel.MaximumPrice = dto.MaximumPrice;
            hotel.MinimumPrice = dto.MinimumPrice;
            hotel.Images =await  _irepo.GetAll(dto.Id);
            hotel.AmenityType = await _arepo.GetAll(dto.Id);
            return hotel;
        }
    }
}
