const dogStyles = `
@keyframes dog-bounce {0%,100%{transform:translateY(0) scale(1)}30%{transform:translateY(-18px) scaleX(0.95) scaleY(1.05)}50%{transform:translateY(-20px) scale(1)}70%{transform:translateY(-10px) scaleX(1.02)}}
@keyframes dog-ears {0%,100%{transform:rotate(0)}30%{transform:rotate(-12deg)}70%{transform:rotate(8deg)}}
@keyframes dog-tail {0%,100%{transform:rotate(0)}50%{transform:rotate(28deg)}}
@keyframes dog-blink {0%,90%,100%{transform:scaleY(1)}95%{transform:scaleY(0.1)}}
@keyframes dog-breath {0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes dog-zzz {0%{opacity:0;transform:translate(0,0) scale(0.6)}30%{opacity:1}100%{opacity:0;transform:translate(-10px,-20px) scale(1.1)}}
@keyframes dog-shiver {0%,100%{transform:translate(0,0)}10%,30%,50%,70%,90%{transform:translate(-0.8px,0.5px)}20%,40%,60%,80%{transform:translate(0.8px,-0.5px)}}
@keyframes dog-sweat {0%{opacity:0;transform:translateY(-5px)}50%{opacity:1}100%{opacity:0;transform:translateY(8px)}}
.dm-happy{animation:dog-bounce 0.9s infinite ease-in-out}
.dm-elh{transform-origin:38px 22px;animation:dog-ears 0.9s infinite ease-in-out}
.dm-erh{transform-origin:62px 22px;animation:dog-ears 0.9s infinite ease-in-out reverse}
.dm-tail{transform-origin:26px 82px;animation:dog-tail 0.18s infinite ease-in-out}
.dm-eyes{transform-origin:center 40px;animation:dog-blink 3.5s infinite}
.dm-sleep{transform-origin:50px 65px;animation:dog-breath 3s infinite ease-in-out}
.dm-z1{animation:dog-zzz 2.5s infinite linear}
.dm-z2{animation:dog-zzz 2.5s infinite linear 1.2s}
.dm-sick{animation:dog-shiver 0.25s infinite linear}
.dm-swt{animation:dog-sweat 2s infinite ease-in-out}
`

function DogStyles() {
  return <style>{dogStyles}</style>
}

export function DogHappy({ size = 60 }) {
  return (
    <svg className="dm-happy" width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="88" rx="22" ry="4" fill="#E2E8F0"/>
      <path d="M 30 75 Q 30 55 50 55 Q 70 55 70 75 Z" fill="#D7A15C"/>
      <path d="M 42 55 Q 50 55 50 72 Q 50 55 58 55 Z" fill="#FFF2DF"/>
      <circle cx="50" cy="40" r="21" fill="#D7A15C"/>
      <circle cx="42" cy="38" r="11" fill="#FFF2DF"/>
      <path className="dm-elh" d="M 32 24 Q 15 15 25 38 Z" fill="#B57C38"/>
      <path className="dm-erh" d="M 68 24 Q 85 15 75 38 Z" fill="#B57C38"/>
      <path d="M 38 38 Q 42 34 44 38" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M 56 38 Q 58 34 62 38" stroke="#2D3748" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M 46 44 Q 50 41 54 44 Q 50 48 46 44 Z" fill="#2D3748"/>
      <path d="M 47 46 Q 50 56 53 46 Z" fill="#FF7B7B"/>
    </svg>
  )
}

export function DogCalm({ size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="88" rx="22" ry="4" fill="#E2E8F0"/>
      <path className="dm-tail" d="M 28 76 C 10 74 12 52 20 46 C 14 56 22 72 28 76" fill="#B57C38"/>
      <path d="M 30 75 Q 30 55 50 55 Q 70 55 70 75 Z" fill="#D7A15C"/>
      <path d="M 42 55 Q 50 55 50 72 Q 50 55 58 55 Z" fill="#FFF2DF"/>
      <circle cx="50" cy="40" r="21" fill="#D7A15C"/>
      <path d="M 50 19 A 21 21 0 0 1 71 40 L 50 40 Z" fill="#966125"/>
      <path d="M 31 30 Q 18 34 26 52 Q 34 42 32 30" fill="#B57C38"/>
      <path d="M 69 30 Q 82 34 74 52 Q 66 42 68 30" fill="#966125"/>
      <g className="dm-eyes">
        <circle cx="42" cy="38" r="3.5" fill="#2D3748"/><circle cx="43.5" cy="36.5" r="1" fill="#FFF"/>
        <circle cx="58" cy="38" r="3.5" fill="#2D3748"/><circle cx="59.5" cy="36.5" r="1" fill="#FFF"/>
      </g>
      <path d="M 46 44 Q 50 41 54 44 Z" fill="#2D3748"/>
      <path d="M 45 49 Q 50 53 55 49" stroke="#2D3748" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

export function DogSleepy({ size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="88" rx="22" ry="4" fill="#E2E8F0"/>
      <g className="dm-sleep">
        <path d="M 30 75 Q 30 55 50 55 Q 70 55 70 75 Z" fill="#D7A15C"/>
        <path d="M 42 55 Q 50 55 50 72 Q 50 55 58 55 Z" fill="#FFF2DF"/>
        <circle cx="50" cy="40" r="21" fill="#D7A15C"/>
        <path d="M 50 19 A 21 21 0 0 1 71 40 L 50 40 Z" fill="#966125"/>
        <path d="M 31 30 Q 18 34 26 52 Q 34 42 32 30" fill="#B57C38"/>
        <path d="M 69 30 Q 82 34 74 52 Q 66 42 68 30" fill="#966125"/>
        <path d="M 38 41 Q 42 44 44 41" stroke="#2D3748" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 56 41 Q 60 44 64 41" stroke="#2D3748" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 46 45 Q 50 42 54 45 Z" fill="#2D3748"/>
        <path d="M 46 49 Q 50 51 54 49" stroke="#2D3748" strokeWidth="1.5" fill="none"/>
      </g>
      <text className="dm-z1" x="72" y="32" fontSize="12" fill="#A0AEC0" fontWeight="bold" fontFamily="monospace">Z</text>
      <text className="dm-z2" x="82" y="22" fontSize="9" fill="#CBD5E0" fontWeight="bold" fontFamily="monospace">z</text>
    </svg>
  )
}

export function DogSick({ size = 60 }) {
  return (
    <svg className="dm-sick" width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="88" rx="22" ry="4" fill="#E2E8F0"/>
      <path d="M 30 75 Q 30 55 50 55 Q 70 55 70 75 Z" fill="#D7A15C"/>
      <path d="M 42 55 Q 50 55 50 72 Q 50 55 58 55 Z" fill="#FFF2DF"/>
      <circle cx="50" cy="40" r="21" fill="#D7A15C"/>
      <path d="M 50 19 A 21 21 0 0 1 71 40 L 50 40 Z" fill="#966125"/>
      <path d="M 31 30 Q 14 38 22 54 Q 32 46 31 30" fill="#B57C38"/>
      <path d="M 69 30 Q 86 38 78 54 Q 68 46 68 30" fill="#966125"/>
      <path d="M 36 38 L 44 42" stroke="#2D3748" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 64 38 L 56 42" stroke="#2D3748" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 44 53 Q 50 48 56 53" stroke="#2D3748" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <g transform="rotate(18 52 49)">
        <rect x="52" y="47" width="18" height="4" rx="2" fill="#edf2f7"/>
        <circle cx="70" cy="49" r="3" fill="#E53E3E"/>
      </g>
      <path className="dm-swt" d="M 24 34 Q 22 40 24 42 Q 26 42 26 40 Z" fill="#3182CE"/>
    </svg>
  )
}
const dogActionStyles = `
@keyframes act-eat-head {0%,100%{transform:rotate(0)}50%{transform:rotate(8deg) translateY(2px)}}
@keyframes act-eat-tail {0%,100%{transform:rotate(0)}50%{transform:rotate(35deg)}}
@keyframes act-lick {0%,100%{transform:scaleY(0.1);opacity:0}50%{transform:scaleY(1);opacity:1}}
@keyframes act-ripple {0%{transform:scale(0.9);opacity:0.6}100%{transform:scale(1.2);opacity:0}}
@keyframes act-walk {0%,100%{transform:translate(0,0) rotate(0)}50%{transform:translate(3px,-4px) rotate(2deg)}}
@keyframes act-lift {0%,100%{transform:rotate(0)}50%{transform:rotate(-20deg)}}
@keyframes act-pee {0%{stroke-dashoffset:10;opacity:0}50%{opacity:1}100%{stroke-dashoffset:0;opacity:0}}
.da-eh{transform-origin:50px 55px;animation:act-eat-head 0.4s infinite ease-in-out}
.da-et{transform-origin:26px 82px;animation:act-eat-tail 0.15s infinite ease-in-out}
.da-dt{transform-origin:50px 48px;animation:act-lick 0.3s infinite ease-in-out}
.da-rp{transform-origin:50px 72px;animation:act-ripple 0.6s infinite linear}
.da-wg{animation:act-walk 0.5s infinite ease-in-out}
.da-pl{transform-origin:35px 75px;animation:act-lift 0.8s infinite ease-in-out}
.da-pd{stroke-dasharray:5;animation:act-pee 0.8s infinite linear}
`

function DogActionStyles() {
  return <style>{dogActionStyles}</style>
}

// כלב אוכל
export function DogFood({ size = 50 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="88" rx="22" ry="4" fill="#E2E8F0"/>
      <path className="da-et" d="M 28 76 C 10 74 12 52 20 46 C 14 56 22 72 28 76" fill="#B57C38"/>
      <path d="M 30 75 Q 30 55 50 55 Q 70 55 70 75 Z" fill="#D7A15C"/>
      <path d="M 42 55 Q 50 55 50 72 Q 50 55 58 55 Z" fill="#FFF2DF"/>
      <g className="da-eh">
        <circle cx="50" cy="42" r="21" fill="#D7A15C"/>
        <path d="M 50 21 A 21 21 0 0 1 71 42 L 50 42 Z" fill="#966125"/>
        <path d="M 31 32 Q 18 36 26 54 Q 34 44 32 32" fill="#B57C38"/>
        <path d="M 69 32 Q 82 36 74 54 Q 66 44 68 32" fill="#966125"/>
        <circle cx="42" cy="40" r="3" fill="#2D3748"/>
        <circle cx="58" cy="40" r="3" fill="#2D3748"/>
        <path d="M 46 46 Q 50 43 54 46 Z" fill="#2D3748"/>
      </g>
      <path d="M 38 76 L 62 76 Q 64 84 50 84 Q 36 84 38 76 Z" fill="#E53E3E"/>
      <ellipse cx="50" cy="76" rx="11" ry="3" fill="#966125"/>
    </svg>
  )
}

// כלב שותה
export function DogWater({ size = 50 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="88" rx="22" ry="4" fill="#E2E8F0"/>
      <path d="M 30 75 Q 30 55 50 55 Q 70 55 70 75 Z" fill="#D7A15C"/>
      <path d="M 42 55 Q 50 55 50 72 Q 50 55 58 55 Z" fill="#FFF2DF"/>
      <circle cx="50" cy="42" r="21" fill="#D7A15C"/>
      <path d="M 50 21 A 21 21 0 0 1 71 42 L 50 42 Z" fill="#966125"/>
      <path d="M 31 32 Q 18 36 26 54 Q 34 44 32 32" fill="#B57C38"/>
      <path d="M 69 32 Q 82 36 74 54 Q 66 44 68 32" fill="#966125"/>
      <path d="M 38 41 Q 42 43 44 41" stroke="#2D3748" strokeWidth="2.5" fill="none"/>
      <path d="M 56 41 Q 60 43 64 41" stroke="#2D3748" strokeWidth="2.5" fill="none"/>
      <path d="M 46 45 Q 50 42 54 45 Z" fill="#2D3748"/>
      <path className="da-dt" d="M 48 48 Q 50 58 52 48 Z" fill="#FF7B7B"/>
      <ellipse className="da-rp" cx="50" cy="74" rx="12" ry="4" stroke="#3182CE" strokeWidth="1" fill="none"/>
      <path d="M 36 74 L 64 74 Q 66 82 50 82 Q 34 82 36 74 Z" fill="#3182CE"/>
      <ellipse cx="50" cy="74" rx="13" ry="3" fill="#63B3ED" opacity="0.7"/>
    </svg>
  )
}

// כלב מטייל
export function DogWalk({ size = 50 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="46" cy="88" rx="22" ry="4" fill="#E2E8F0"/>
      <g className="da-wg">
        <path d="M 26 75 Q 26 55 46 55 Q 66 55 66 75 Z" fill="#D7A15C"/>
        <circle cx="46" cy="40" r="21" fill="#D7A15C"/>
        <path d="M 46 19 A 21 21 0 0 1 67 40 L 46 40 Z" fill="#966125"/>
        <path d="M 27 30 Q 14 34 22 52 Q 30 42 28 30" fill="#B57C38"/>
        <path d="M 65 30 Q 78 34 70 52 Q 62 42 64 30" fill="#966125"/>
        <circle cx="38" cy="38" r="3.5" fill="#2D3748"/>
        <circle cx="54" cy="38" r="3.5" fill="#2D3748"/>
        <path d="M 42 44 Q 46 41 50 44 Z" fill="#2D3748"/>
        <path d="M 43 48 Q 46 54 49 48 Z" fill="#FF7B7B"/>
      </g>
      <path className="da-leash" style={{ strokeDasharray: 4 }} d="M 48 58 Q 75 45 95 15" stroke="#4A5568" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

// כלב בשירותים
export function DogBathroom({ size = 50 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="60" cy="88" rx="22" ry="4" fill="#E2E8F0"/>
      <rect x="20" y="50" width="12" height="30" rx="4" fill="#E53E3E"/>
      <circle cx="26" cy="46" r="6" fill="#E53E3E"/>
      <rect x="17" y="58" width="18" height="4" fill="#C53030"/>
      <circle cx="26" cy="60" r="3" fill="#A0AEC0"/>
      <path d="M 45 75 Q 45 55 65 55 Q 85 55 85 75 Z" fill="#D7A15C"/>
      <path className="da-pl" d="M 45 72 Q 32 66 38 76 Z" fill="#B57C38"/>
      <circle cx="65" cy="40" r="21" fill="#D7A15C"/>
      <path d="M 65 19 A 21 21 0 0 1 86 40 L 65 40 Z" fill="#966125"/>
      <path d="M 46 30 Q 33 34 41 52 Q 49 42 47 30" fill="#B57C38"/>
      <path d="M 84 30 Q 97 34 89 52 Q 81 42 83 30" fill="#966125"/>
      <circle cx="55" cy="38" r="3" fill="#2D3748"/>
      <circle cx="70" cy="38" r="3" fill="#2D3748"/>
      <path d="M 58 44 Q 61 42 64 44 Z" fill="#2D3748"/>
      <path className="da-pd" d="M 34 72 Q 28 68 25 66" stroke="#ECC94B" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

export { DogActionStyles }
export { DogStyles }