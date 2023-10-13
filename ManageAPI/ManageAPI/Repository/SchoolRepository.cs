using ManageAPI.Model;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

namespace ManageAPI.Repository
{
    public class SchoolRepository : ISchoolRepository
    {
        private readonly SchoolContext _dbContext;
        public SchoolRepository(SchoolContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task Add(School entity)
        {
            try
            {
                await _dbContext.AddAsync(entity);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Delete(int ID)
        {
            try
            {
                _dbContext.Schools.Remove(_dbContext.Schools.Single(x => x.Id == ID));
                await _dbContext.SaveChangesAsync();

                return;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<SchoolModel> GetAll(int entities)
        {
            try
            {
                var allSchool = new List<School>();

                if (entities > 0)
                    allSchool = await _dbContext.Schools
                        .Take(entities)
                        .OrderByDescending(x => x.CreatedDate)
                        .ToListAsync();
                else
                    allSchool = await _dbContext.Schools
                        .ToListAsync();

                var amountSchool = await _dbContext.Schools
                        .CountAsync();

                return new SchoolModel()
                {
                    TotalCount = amountSchool,
                    Schools = allSchool
                };

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<School> GetByID(int ID)
        {
            try
            {
                return await _dbContext.Schools.FindAsync(ID);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<SchoolModel> GetPaging(PageRequest paging)
        {
            try
            {
                var allSchool = await _dbContext.Schools.Skip((paging.CurrentPage) * paging.PageSize)
                    .Take(paging.PageSize)
                    .ToListAsync();
                var amountSchool = await _dbContext.Schools.CountAsync();

                return new SchoolModel()
                {
                    TotalCount = amountSchool,
                    Schools = allSchool
                };

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task Update(School entity)
        {
            try
            {
                _dbContext.Update(entity);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
