export default function generatePaginationButtons(itemsArray, itemsPerPage = 5) {
  if (itemsPerPage > itemsArray.length) throw new Error("The number of items per page should not exceed the number of items");
  const numberOfPages = Math.ceil(itemsArray.length / itemsPerPage);
  console.log(numberOfPages);
  for (let i = 1; i <= numberOfPages; i++) {
    const newButton = (`<button class="button page">${i}</button>`);
    $(".pagination-numbers").append(newButton);
  }
}