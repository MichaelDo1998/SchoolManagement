using ManageAPI.Model;

namespace ManageAPI.Repository
{
    public interface ISchoolRepository
    {
        public Task<SchoolModel> GetPaging(PageInfo paging);
        public Task<SchoolModel> GetAll();
        public Task<School> GetByID(int ID);
        public Task Delete(int ID);
        public Task Update(School entity);
        public Task Add(School entity);
    }
}
