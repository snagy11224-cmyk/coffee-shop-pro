import React, { useMemo, useState } from "react";

// Your messages “base”
const MESSAGES = [
  "Take one slow breath before your first sip. Let today settle gently.",
  "Savor your coffee, don’t rush it. This cup is your pause.",
  "Feel the warmth in your hands. Let your shoulders drop.",
  "Coffee is better when you're present — one sip at a time.",
  "Enjoy the aroma before the taste. It wakes the senses.",
  "A warm cup is a reminder that you deserve comfort too.",
  "Pair your coffee with a deep breath. Calm is part of the ritual.",
  "Good coffee asks you to slow down. Let it guide you there.",
  "Sit up softly, relax your jaw — now sip.",
  "Let the first sip be just for you, not the world.",
  "Drinking coffee mindfully improves mood — try noticing each flavor.",
  "Bitterness isn't bad — it adds depth, just like life.",
  "A warm drink can soothe the nervous system — feel that warmth spread.",
  "Hydrate too — a glass of water beside your cup is kindness to yourself.",
  "Set your phone down for the first 5 sips. This moment is yours.",
  "Warm liquids can calm the stomach — take your time with it.",
  "A steady sip can steady your thoughts.",
  "Your cup doesn't need to be perfect. Neither do you.",
  "Notice how the cup feels — the heat, the weight — grounding.",
  "Coffee has antioxidants that support your cells — enjoy them slowly.",
  "Your morning pace sets the tone — let it be gentle.",
  "Let this sip be a soft beginning.",
  "Enjoy the quiet between sips — stillness is nourishment.",
  "Sometimes the pause is more important than the productivity.",
  "Your coffee can't solve the day — but it can support *you* while you do.",
  "Take a moment to unclench your jaw. Sip. Repeat.",
  "Warmth reminds the body it's safe — let your body hear that message.",
  "A clear mind comes from slow moments, not rushed ones.",
  "Let the caffeine lift, not push. Sip, don’t gulp.",
  "Good coffee pairs well with good posture — relax your shoulders.",
  "Your breath is part of the ritual — inhale the aroma, exhale the stress.",
  "Notice how the flavor changes as it cools — patience is beautiful.",
  "Your coffee break counts as self-care. Don’t downplay it.",
  "Taste the notes — chocolate? nuts? fruit? Let curiosity guide you.",
  "A warm drink can help digestion — slow, steady sips.",
  "This cup can be a reset button — if you allow it.",
  "Focus on the warmth in your chest — comfort lives there.",
  "Coffee and stillness: a simple recipe for peace.",
  "Rest your mind for the duration of this cup.",
  "Let your thoughts settle like grounds in a French press.",
  "You are allowed to enjoy this cup without rushing to the next task.",
  "Let the moment brew — not just the coffee.",
  "You’re not behind. You’re right where your cup meets you.",
  "Sip with kindness toward yourself.",
  "Warm your hands, warm your heart.",
  "Every sip is a reminder: you are allowed to slow down.",
  "This cup is permission to exhale.",
  "Nourish your morning, don’t conquer it.",
  "May your day unfold as gently as your coffee cools."];

export function MessageOfTheDayButton({ className = "btn btn-primary ms-lg-3" }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const pickRandom = useMemo(
    () => () => {
      const idx = Math.floor(Math.random() * MESSAGES.length);
      return MESSAGES[idx];
    },
    []
  );

  const onClick = () => {
    setMsg(pickRandom());
    setOpen(true);
  };

  const close = () => setOpen(false);

  return (
    <>
      <button type="button" className={className} onClick={onClick}>
        See your message for today
      </button>

      {/* Simple modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.45)", zIndex: 1050 }}
          onClick={close}
        >
          <div
            className="card shadow-lg p-4"
            style={{
              maxWidth: 520,
              margin: "10vh auto",
              cursor: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="mb-3">Message for you</h5>
            <p className="mb-4 fs-5">{msg}</p>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setMsg(pickRandom())}
              >
                Show another
              </button>
              <button type="button" className="btn btn-primary" onClick={close}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
