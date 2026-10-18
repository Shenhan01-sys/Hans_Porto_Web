import { ScrambleHeading } from "@/components/fx/text";
import { AwardsTrack } from "@/components/site/recognition/awards-track";
import { Papers } from "@/components/site/recognition/papers";
import { EducationPath } from "@/components/site/recognition/education-path";
import { CertificateShelf } from "@/components/site/recognition/certificate-shelf";

// Four parts, four layouts: a pinned sideways track for prizes, fanned pages for papers,
// a drawn path for education and a draggable shelf for certificates.
export function Recognition() {
  return (
    <section id="recognition" aria-labelledby="recognition-title" className="relative border-b border-line pb-s-8 pt-section">
      <div className="wrap">
        <ScrambleHeading id="recognition-title" className="font-display text-h2">
          Recognition
        </ScrambleHeading>
        <p className="mt-s-2 max-w-measure text-ink-2">Prizes, papers, schools and certificates. Every result links to its proof where one is public.</p>
      </div>

      <AwardsTrack />

      <div className="wrap">
        <Papers />
        <EducationPath />
      </div>

      <CertificateShelf />
    </section>
  );
}
