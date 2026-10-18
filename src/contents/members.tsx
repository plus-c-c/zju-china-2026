import { useState } from "react";
import { members, type Member } from "./members-data";
import "./members.css";

function MemberCard({ member, index }: { member: Member; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  // A small inward shift: 20% of the center-to-golden-line distance.
  const imageShiftX = index % 2 ? -2.36 : 2.36;
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <article
      className={`members-card${index % 2 ? " members-card--reversed" : ""}`}
      aria-labelledby={member.id}
      aria-describedby={`${member.id}-bio`}
      tabIndex={0}
    >
      <div className="members-card__portrait">
        {member.imageUrl && !imageFailed ? (
          <img
            src={member.imageUrl}
            style={{
              objectPosition: member.imagePosition,
              transform: `translateX(${imageShiftX}%) scale(1.06)`,
              transformOrigin: "50% 15%",
            }}
            alt={`Portrait of ${member.name}`}
            width={320}
            height={320}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="members-card__initials"
            role="img"
            aria-label={`Initials for ${member.name}`}
          >
            {initials}
          </div>
        )}
      </div>
      <div className="members-card__details">
        <div className="members-card__summary">
          <h3 id={member.id}>
            {member.name}
            {member.nickname ? ` (${member.nickname})` : ""}
          </h3>
          <p className="members-card__role">{member.role}</p>
        </div>
        <p className="members-card__bio" id={`${member.id}-bio`}>
          {member.bio}
        </p>
      </div>
    </article>
  );
}

export function Members() {
  return (
    <div className="members-page">
      {[
        { id: "leaders", title: "Student Leaders" },
        { id: "students", title: "Students" },
        { id: "pis", title: "PIs" },
        { id: "advisors", title: "Advisors" },
      ].map((group) => (
        <section
          className="members-section"
          key={group.id}
          aria-labelledby={`members-${group.id}`}
        >
          <h2 id={`members-${group.id}`}>{group.title}</h2>
          <div className="members-list">
            {members
              .filter((member) => member.group === group.id)
              .map((member, index) => (
                <MemberCard key={member.id} member={member} index={index} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
