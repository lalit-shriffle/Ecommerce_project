export function calculatePagination(page){
    const itemPerPage = 6;
    const start = (page-1) * itemPerPage;
    const end = start + itemPerPage;
    return {start , end}
}