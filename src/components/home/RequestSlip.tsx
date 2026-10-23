"use client";

import { useId, useState } from "react";

import { whatsappUrl } from "@/lib/site";

type Option = { value: string; label: string };

type Labels = {
  heading: string;
  intro: string;
  equipmentLabel: string;
  durationLabel: string;
  locationLabel: string;
  locationPlaceholder: string;
  operatorLabel: string;
  continue: string;
  whatsapp: string;
  summaryTitle: string;
  summaryEmpty: string;
  summaryOperatorYes: string;
  summaryOperatorNo: string;
};

/**
 * The page's one live thing: a rental request slip. It is a plain GET form to the contact page,
 * so it works without JavaScript; with it, the slip fills in as you choose and can go straight
 * to WhatsApp with the request already written.
 */
export function RequestSlip({
  action,
  labels,
  equipment,
  durations,
}: {
  action: string;
  labels: Labels;
  equipment: Option[];
  durations: Option[];
}) {
  const id = useId();
  const [picked, setPicked] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [location, setLocation] = useState("");
  const [operator, setOperator] = useState(false);

  const equipmentName = equipment.find((o) => o.value === picked)?.label;
  const durationName = durations.find((o) => o.value === duration)?.label;
  const lines = [
    equipmentName && `${labels.equipmentLabel}: ${equipmentName}`,
    durationName && `${labels.durationLabel}: ${durationName}`,
    location.trim() && `${labels.locationLabel}: ${location.trim()}`,
    (equipmentName || durationName) && (operator ? labels.summaryOperatorYes : labels.summaryOperatorNo),
  ].filter(Boolean) as string[];
  const wa = whatsappUrl(lines.length ? `${labels.summaryTitle}\n${lines.join("\n")}` : undefined);

  return (
    <form className="slip" action={action} method="get" aria-labelledby={`${id}-title`}>
      <div className="slip__fields">
        <h3 id={`${id}-title`} className="slip__title">
          {labels.heading}
        </h3>
        <p className="slip__intro">{labels.intro}</p>

        <fieldset className="chips">
          <legend>{labels.equipmentLabel}</legend>
          {equipment.map((o) => (
            <label key={o.value} className="chip">
              <input type="radio" name="equipment" value={o.value} checked={picked === o.value} onChange={() => setPicked(o.value)} />
              <span>{o.label}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="chips">
          <legend>{labels.durationLabel}</legend>
          {durations.map((o) => (
            <label key={o.value} className="chip">
              <input type="radio" name="duration" value={o.value} checked={duration === o.value} onChange={() => setDuration(o.value)} />
              <span>{o.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="slip__row">
          <label className="field">
            <span className="field__label">{labels.locationLabel}</span>
            <input
              type="text"
              name="location"
              maxLength={200}
              autoComplete="off"
              placeholder={labels.locationPlaceholder}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label className="check">
            <input type="checkbox" name="operator" value="1" checked={operator} onChange={(e) => setOperator(e.target.checked)} />
            <span>{labels.operatorLabel}</span>
          </label>
        </div>
      </div>

      <div className="slip__ticket" aria-live="polite">
        <p className="slip__ticket-title">{labels.summaryTitle}</p>
        {lines.length ? (
          <ul>
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <p className="slip__empty">{labels.summaryEmpty}</p>
        )}
        <div className="slip__actions">
          <button type="submit" className="btn btn--ink">
            {labels.continue}
          </button>
          {wa ? (
            <a className="text-link" href={wa} target="_blank" rel="noopener">
              {labels.whatsapp}
            </a>
          ) : null}
        </div>
      </div>
    </form>
  );
}
