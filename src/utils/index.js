const sortList = (lists, sortType = 'desc') => {
  return lists.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return (
      (dateA === dateB ? 0 : dateA < dateB ? -1 : 1) *
      (sortType === 'desc' ? -1 : 1)
    );
  });
};

export {sortList};
