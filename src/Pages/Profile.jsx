import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import spinner from "../assets/spinner.gif";
import { db } from "../firebase";
import banner from "../assets/banner.png";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import defaultImage from '../assets/defaultimg.png'
import {
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
export default function Profile() {
  const [listings, setListings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchListings() {
      const listingRef = collection(db, "users");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      sessionStorage.setItem("Listing", JSON.stringify(listings));
      setLoading(false);
    }

    if (sessionStorage.getItem("Listing") === null) {
      fetchListings();
    } else if (sessionStorage.getItem("Listing") !== null) {
      setListings(JSON.parse(sessionStorage.getItem("Listing")));
      setLoading(false);
    }
  }, []);

  return (
    <>
      {console.log(listings[0]?.data?.location)}
      <div class="h-full bg-gray-200 p-4">
        <div class="bg-white rounded-lg shadow-xl pb-8">
          <div class="absolute right-12 mt-4 rounded">
            <button
              class="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
              title="Settings"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                ></path>
              </svg>
            </button>
            {/* <div   class="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl" style={{display: "none"}}>
                    <div class="py-2 border-b">
                        <p class="text-gray-400 text-xs px-6 uppercase mb-1">Settings</p>
                        <button class="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                            </svg>
                            <span class="text-sm text-gray-700">Share Profile</span>
                        </button>
                        <button class="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                            </svg>
                            <span class="text-sm text-gray-700">Block User</span>
                        </button>
                        <button class="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-sm text-gray-700">More Info</span>
                        </button>
                    </div>
                    <div class="py-2">
                        <p class="text-gray-400 text-xs px-6 uppercase mb-1">Feedback</p>
                        <button class="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <span class="text-sm text-gray-700">Report</span>
                        </button>
                    </div>
                </div> */}
          </div>
          <div class="w-full h-[300px]">
            <img
              src={banner}
              class="w-full h-full rounded-tl-lg rounded-tr-lg object-fill"
            />
          </div>
          <div class="flex flex-col items-center -mt-20">
           {listings[0]?.data?.images.length>0 ? <img
              src={listings[0]?.data?.images[0]}
              class="w-40 h-40 border-4 border-white rounded-full"
            />: <img
            src={defaultImage}
            class="w-40 h-40 border-4 border-white rounded-full"
          />}
            <div class="flex items-center space-x-2 mt-2">
              <p class="text-2xl">{listings[0]?.data?.name}</p>
              <span class="bg-blue-500 rounded-full p-1" title="Verified">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-gray-100 h-2.5 w-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </span>
            </div>
            <p class="text-gray-700 text-center">
              {listings[0]?.data?.position} at Codechef Cuiet Chapter
            </p>
            <p class="text-sm text-gray-500">{listings[0]?.data?.location}</p>
          </div>
          <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
            <div class="flex items-center space-x-4 mt-2">
              <button onClick={()=>{auth.signOut()
                navigate("/")}} class="flex items-center bg-red-600 hover:bg-red-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                </svg>
                <span className="text-xs xs:text-sm">Logout</span>
              </button>
              <a href="mailto:president@codechef-cuiet.tech" class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-xs xs:text-sm">Mail President</span>
              </a>
              <a  href="mailto:hr@codechef-cuiet.tech"class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-xs xs:text-sm">Mail HR</span>
              </a>
            </div>
          </div>
        </div>

        <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div class="w-full flex flex-col 2xl:w-1/3">
            <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4>
              <ul class="mt-2 text-gray-700">
                <li class="flex border-y py-2">
                  <span class="font-bold w-24">Full name:</span>
                  <span class="text-gray-700">
                    {auth.currentUser.displayName}
                  </span>
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-24">Birthday:</span>
                  <span class="text-gray-700">{listings[0]?.data?.date}</span>
                </li>

                <li class="flex border-b py-2">
                  <span class="font-bold w-24">Mobile:</span>
                  <span class="text-gray-700">{listings[0]?.data?.phone}</span>
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-24">Email:</span>
                  <span class="text-gray-700 truncate">
                    {listings[0]?.data?.email}
                  </span>
                </li>
                <li class="flex border-b py-2">
                  <span class="font-bold w-24">Location:</span>
                  <span class="text-gray-700">
                    {listings[0]?.data?.location}
                  </span>
                </li>

                <li class="flex items-center border-b py-2 space-x-2">
                  <span class="font-bold w-24">Socials:</span>
                  <a href={listings[0]?.data?.linkedin} title="LinkedIn">
                    <svg
                      class="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 333333 333333"
                      shape-rendering="geometricPrecision"
                      text-rendering="geometricPrecision"
                      image-rendering="optimizeQuality"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    >
                      <path
                        d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm-18220 138885h28897v14814l418 1c4024-7220 13865-14814 28538-14814 30514-1 36157 18989 36157 43691v50320l-30136 1v-44607c0-10634-221-24322-15670-24322-15691 0-18096 11575-18096 23548v45382h-30109v-94013zm-20892-26114c0 8650-7020 15670-15670 15670s-15672-7020-15672-15670 7022-15670 15672-15670 15670 7020 15670 15670zm-31342 26114h31342v94013H96213v-94013z"
                        fill="#0077b5"
                      ></path>
                    </svg>
                  </a>
                  <a href={listings[0]?.data?.instagram} title="Instagram">
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="28"
                        height="28"
                        rx="6"
                        fill="url(#paint0_radial_87_7153)"
                      />
                      <rect
                        x="2"
                        y="2"
                        width="28"
                        height="28"
                        rx="6"
                        fill="url(#paint1_radial_87_7153)"
                      />
                      <rect
                        x="2"
                        y="2"
                        width="28"
                        height="28"
                        rx="6"
                        fill="url(#paint2_radial_87_7153)"
                      />
                      <path
                        d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z"
                        fill="white"
                      />
                      <defs>
                        <radialGradient
                          id="paint0_radial_87_7153"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"
                        >
                          <stop stop-color="#B13589" />
                          <stop offset="0.79309" stop-color="#C62F94" />
                          <stop offset="1" stop-color="#8A3AC8" />
                        </radialGradient>
                        <radialGradient
                          id="paint1_radial_87_7153"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"
                        >
                          <stop stop-color="#E0E8B7" />
                          <stop offset="0.444662" stop-color="#FB8A2E" />
                          <stop offset="0.71474" stop-color="#E2425C" />
                          <stop
                            offset="1"
                            stop-color="#E2425C"
                            stop-opacity="0"
                          />
                        </radialGradient>
                        <radialGradient
                          id="paint2_radial_87_7153"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"
                        >
                          <stop offset="0.156701" stop-color="#406ADC" />
                          <stop offset="0.467799" stop-color="#6A45BE" />
                          <stop
                            offset="1"
                            stop-color="#6A45BE"
                            stop-opacity="0"
                          />
                        </radialGradient>
                      </defs>
                    </svg>{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div class="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
              <h4 class="text-xl text-gray-900 font-bold">Notice Board</h4>
              <div class="relative px-4">
                <div class="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">Coming Soon</p>
                    <p class="text-xs text-gray-500">3 min ago</p>
                  </div>
                </div>

                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">
                      Connected with{" "}
                      <a href="#" class="text-blue-600 font-bold">
                        Coming Soon
                      </a>
                      .
                    </p>
                    <p class="text-xs text-gray-500">15 min ago</p>
                  </div>
                </div>

                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">
                      Coming Soon
                      <a href="#" class="text-blue-600 font-bold">
                        #4563
                      </a>{" "}
                      was created.
                    </p>
                    <p class="text-xs text-gray-500">57 min ago</p>
                  </div>
                </div>

                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">
                      Coming Soon{" "}
                      <a href="#" class="text-blue-600 font-bold">
                        Coming Soon
                      </a>
                      .
                    </p>
                    <p class="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>

                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">
                      Coming Soon
                      <a href="#" class="text-blue-600 font-bold">
                        #OR9653
                      </a>
                      .
                    </p>
                    <p class="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div class="flex items-center w-full my-6 -ml-1.5">
                  <div class="w-1/12 z-10">
                    <div class="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <div class="w-11/12">
                    <p class="text-sm">
                      Coming Soon{" "}
                      <a href="#" class="text-blue-600 font-bold">
                        Coming Soon
                      </a>
                      .
                    </p>
                    <p class="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full 2xl:w-2/3">
            <div class="flex-1 bg-white rounded-lg shadow-xl p-8 flex flex-col items-start justify-start w-full">
              <h4 class="text-xl text-gray-900 font-bold">About</h4>
              <p class="mt-2 text-gray-700 whitespace-preline">{listings[0]?.data?.about}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
