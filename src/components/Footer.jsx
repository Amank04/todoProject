import React from 'react'

const footer = () => {
  return (
    <div >
        <footer class="bg-blue-700 text-white p-4 w-full relative mt-3">
    <div class="container mx-auto flex justify-between items-center">
        <div>
            <p class="text-sm mb-0 pb-0">Made with 💗 by</p>
            <h1 class="text-2xl font-bold mt-0 pt-0 mb-1">Aman Kumar</h1>
            <p class="text-sm">{new Date().getFullYear()} &copy; All rights reserved. </p>
        </div>
        <div>
            <h2 class="text-lg font-semibold mb-2">Contact Us</h2>
            <p class="text-sm">6/53,Vijay Nagar</p>
            <p class="text-sm">Double storey, North-West Delhi</p>
            <p class="text-sm">amangrd8@cic.du.ac.in</p>
        </div>
    </div>
</footer>

    </div>
  )
}

export default footer