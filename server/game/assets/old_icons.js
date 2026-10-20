const AVS=[
`<svg class="avi" viewBox="0 0 64 64"><rect x="11" y="28" width="42" height="27" rx="5" fill="#e5484d"/><rect x="8" y="20" width="48" height="12" rx="5" fill="#ff6a70"/><rect x="28" y="20" width="8" height="35" fill="#ffd25a"/><path d="M32 20C26 8 13 10 16 17c2 4 11 3 16 3zM32 20c6-12 19-10 16-3-2 4-11 3-16 3z" fill="#ffd25a"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><ellipse cx="32" cy="57" rx="16" ry="9" fill="#b97a4b"/><circle cx="17" cy="17" r="8" fill="#b97a4b"/><circle cx="47" cy="17" r="8" fill="#b97a4b"/><circle cx="17" cy="17" r="4" fill="#efbf94"/><circle cx="47" cy="17" r="4" fill="#efbf94"/><circle cx="32" cy="32" r="18" fill="#cf9460"/><ellipse cx="32" cy="38" rx="9" ry="7" fill="#f3d2ac"/><ellipse cx="32" cy="35" rx="3.2" ry="2.4" fill="#3d2b20"/><path d="M32 37.5v3M28.5 41.5c1.5 1.5 5.5 1.5 7 0" stroke="#3d2b20" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="24.5" cy="28" r="2.3" fill="#3d2b20"/><circle cx="39.5" cy="28" r="2.3" fill="#3d2b20"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><ellipse cx="32" cy="40" rx="25" ry="18" fill="#58c960"/><circle cx="19" cy="23" r="10" fill="#6bdc72"/><circle cx="45" cy="23" r="10" fill="#6bdc72"/><circle cx="19" cy="23" r="6" fill="#fff"/><circle cx="45" cy="23" r="6" fill="#fff"/><circle cx="20.5" cy="23.5" r="3" fill="#1d2b1f"/><circle cx="43.5" cy="23.5" r="3" fill="#1d2b1f"/><path d="M17 43c4 7 26 7 30 0" stroke="#1f6f2c" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="28" cy="35" r="1.3" fill="#1f6f2c"/><circle cx="36" cy="35" r="1.3" fill="#1f6f2c"/><circle cx="14" cy="42" r="3" fill="#ff8fa3" opacity=".6"/><circle cx="50" cy="42" r="3" fill="#ff8fa3" opacity=".6"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><path d="M32 57C16 57 8 45 10 33c2-12 14-17 22-11 8-6 20-1 22 11 2 12-6 24-22 24z" fill="#ff8f73"/><path d="M32 22c-3 10-2 22 4 33" stroke="#e8605a" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/><ellipse cx="21" cy="33" rx="4" ry="7" fill="#fff" opacity=".28" transform="rotate(20 21 33)"/><path d="M32 22c-2-9 5-14 14-12-1 8-7 13-14 12z" fill="#4cc36b"/><path d="M32 22l1-8" stroke="#8a5a3a" stroke-width="3" stroke-linecap="round"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><path d="M9 41C9 25 19 14 33 14s22 11 22 27z" fill="#3b8cff"/><path d="M16 30c1-7 6-11 12-12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".35"/><path d="M34 14C29 22 28 32 31 41" stroke="#2467d1" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="33" cy="14" r="3.5" fill="#2467d1"/><rect x="9" y="38" width="46" height="7" rx="3.5" fill="#2467d1"/><path d="M36 42h25c0 7-9 9-17 9-6 0-8-4-8-9z" fill="#1a4fa8"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><circle cx="32" cy="41" r="15" fill="none" stroke="#ffc933" stroke-width="6.5"/><circle cx="32" cy="41" r="15" fill="none" stroke="#ffe27a" stroke-width="2" stroke-dasharray="14 90" stroke-linecap="round" transform="rotate(-150 32 41)"/><path d="M23 17l4-7h10l4 7-9 11z" fill="#6fd8ff"/><path d="M23 17h18M27 10l5 7 5-7M32 17v11" stroke="#fff" stroke-width="1.5" fill="none" stroke-linejoin="round" opacity=".75"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><path d="M32 57C9 41 7 25 16 17c7-6 14-2 16 4 2-6 9-10 16-4 9 8 7 24-16 40z" fill="#ff4d6d"/><path d="M17 24c1-4 5-6 9-4" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".55"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><path d="M26 44H38L32 61z" fill="#ffb21f"/><path d="M29 44h6l-3 9z" fill="#ffe27a"/><path d="M20 32L10 46l11-3zM44 32l10 14-11-3z" fill="#ff5d5d"/><path d="M32 4c11 9 15 22 13 38H19C17 26 21 13 32 4z" fill="#eef1f8"/><path d="M32 4c4 3.5 7.5 8.5 9.5 15h-19C24.5 12.5 28 7.5 32 4z" fill="#ff5d5d"/><circle cx="32" cy="29" r="5.5" fill="#3b8cff" stroke="#b7c2d8" stroke-width="2.5"/><rect x="24" y="40" width="16" height="6" rx="2.5" fill="#9aa4ba"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><path d="M17 58l4-11h22l4 11z" fill="#5b3f94"/><rect x="15" y="55" width="34" height="5" rx="2.5" fill="#46307a"/><circle cx="32" cy="29" r="20" fill="#7a4dff"/><circle cx="32" cy="31" r="13" fill="#a98bff" opacity=".5"/><path d="M19 24c2-6 8-10 14-10" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".7"/><path d="M38 28l1.8 4.2L44 34l-4.2 1.8L38 40l-1.8-4.2L32 34l4.2-1.8z" fill="#fff" opacity=".9"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><path d="M19 10h26l12 15-25 32L7 25z" fill="#35b6f2"/><path d="M19 10h26l12 15H7z" fill="#82ddff"/><path d="M7 25h50M19 10l7 15M45 10l-7 15M32 10v15M26 25l6 32M38 25l-6 32" stroke="#fff" stroke-width="1.6" fill="none" stroke-linejoin="round" stroke-linecap="round" opacity=".7"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><path d="M9 47L6 20l15 12 11-18 11 18 15-12-3 27z" fill="#ffc933"/><rect x="9" y="46" width="46" height="9" rx="3.5" fill="#ff9f1a"/><circle cx="6" cy="20" r="4" fill="#ff5d73"/><circle cx="32" cy="12" r="4.5" fill="#ff5d73"/><circle cx="58" cy="20" r="4" fill="#ff5d73"/><circle cx="22" cy="50.5" r="2.2" fill="#fff" opacity=".9"/><circle cx="32" cy="50.5" r="2.2" fill="#fff" opacity=".9"/><circle cx="42" cy="50.5" r="2.2" fill="#fff" opacity=".9"/></svg>`,
`<svg class="avi" viewBox="0 0 64 64"><path d="M32 6l7.5 17.5 19 1.8-14.4 12.5 4.4 18.6L32 46.5 15.5 56.4l4.4-18.6L5.5 25.3l19-1.8z" fill="#ffc933" stroke="#ffc933" stroke-width="4" stroke-linejoin="round"/><path d="M32 16l4 9.5 10 .9-7.6 6.6" stroke="#ffe9a3" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`
];
const GIFTP='M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-1-3-5-3-5-1 0 1.5 3 1 5 1zM12 7c1-3 5-3 5-1 0 1.5-3 1-5 1z';
const ICO={
 dots:'<circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>',
 chart:'<path d="M5 20V11M12 20V5M19 20v-7"/>',
 trophy:'<path d="M8 4h8v5a4 4 0 01-8 0zM8 6H5v1a3 3 0 003 3M16 6h3v1a3 3 0 01-3 3M12 13v4M8 20h8M9.5 17h5"/>',
 star:'<path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8L3.6 9.6l5.8-.8z"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.2"/>',
 trash:'<path d="M5 7h14M10 7V4.5h4V7M7 7l.8 12.5h8.4L17 7M10.2 11v5M13.8 11v5"/>',
 chev:'<path d="M9 5.5l6.5 6.5L9 18.5"/>',
 back:'<path d="M15 5.5L8.5 12l6.5 6.5"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',
 image:'<rect x="3.5" y="5" width="17" height="14" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 3.5 3 3-2.5 4.5 4"/>',
 user:'<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1-4 3.8-5.8 7.5-5.8s6.5 1.8 7.5 5.8"/>',
 share:'<path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"/>',
 gift:'<path d="'+GIFTP+'"/>',
 clover:'<circle cx="9" cy="9" r="3.2"/><circle cx="15" cy="9" r="3.2"/><circle cx="9" cy="15" r="3.2"/><circle cx="15" cy="15" r="3.2"/><path d="M13.5 17.5L16.5 21"/>',
 gram:'<path d="M4.5 6h15L12 19.5z"/>',
 up:'<path d="M12 7l6.5 10h-13z"/>',
 down:'<path d="M12 17L5.5 7h13z"/>',
 check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 cake:'<path d="M4 20h16M5 20v-7a1 1 0 011-1h12a1 1 0 011 1v7M5 16c1.2 1.3 2.3 1.3 3.5 0s2.3-1.3 3.5 0 2.3 1.3 3.5 0 2.3-1.3 3.5 0M12 12V8.5M12 7c-.9-.8-.9-1.8 0-3 .9 1.2.9 2.2 0 3z"/>'
},FL=['dots','up','down'];
const ico=(n,z=20)=>`<svg class="ic${FL.includes(n)?' fl':''}" viewBox="0 0 24 24" width="${z}" height="${z}">${ICO[n]}</svg>`;

