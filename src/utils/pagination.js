exports.pagination = async ({ pageSize, totalData, currentPage }) => {
  return {
    page_size: pageSize,
    total_data: totalData,
    total_page: Math.ceil(totalData / pageSize),
    current_page: currentPage,
  };
};
