using HotelManagement.Interfaces;
using HotelManagement.Models;
using HotelManagement.Models.DTO;
using HotelManagement.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]/action")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _service;
        private readonly ILogger<HotelController> _logger;

        public HotelController(IHotelService service, ILogger<HotelController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpPost("AddHotel")]
        [ProducesResponseType(typeof(Hotel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Hotel>> Add(Hotel hotel)
        {
            try
            {
                var Result = await _service.Add(hotel);
                if (Result != null)
                    return Ok("Hotel Information Successfully Added!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot add at this time");
        }

        [HttpDelete("DeleteHotel")]
        [ProducesResponseType(typeof(Hotel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Hotel>> Delete(IdDTO hotel)
        {
            try
            {
                var Result = await _service.Delete(hotel.Id);
                if (Result != null)
                    return Ok("Hotel Information Successfully Deleted!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot delete at this time");
        }

        [HttpPut("UpdateHotel")]
        [ProducesResponseType(typeof(Hotel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Hotel>> Update(Hotel hotel)
        {
            try
            {
                var Result = await _service.Update(hotel);
                if (Result != null)
                    return Ok("Hotel Information Successfully Updated!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot Update at this time");
        }

        [HttpGet("GetAllHotels")]
        [ProducesResponseType(typeof(ICollection<HotelDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ICollection<HotelDTO>>> GetAll()
        {
            try
            {
                var Result = await _service.GetAll();
                if (Result != null)
                    return Ok(Result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot fetch at this time");
        }

        [HttpPost("GetHotel")]
        [ProducesResponseType(typeof(Hotel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Hotel>> Get(IdDTO dto)
        {
            try
            {
                var Result = await _service.Get(dto.Id);
                if (Result != null)
                    return Ok(Result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return BadRequest("Cannot fetch at this time");
        }
    }
}
