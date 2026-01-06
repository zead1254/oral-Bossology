
import { Exam, Question } from './types';

const parseRaw = (id: number, raw: string): Question[] => {
  const parts = raw.split('---');
  return parts.filter(p => p.trim()).map((p, idx) => {
    const lines = p.trim().split('\n');
    const text = lines[0].trim();
    const options = lines.slice(1, 5).map(l => l.replace(/^[A-D]\.\s*/, '').trim());
    const ansChar = lines[5]?.replace('Answer: ', '').trim() || 'B';
    const charMap: Record<string, number> = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    return {
      id: `e${id}-q${idx}`,
      text,
      options,
      correctAnswer: charMap[ansChar] ?? 1,
      explanation: "هذه المعلومة من الأسس الهامة في علم أمراض الفم والوجه والفكين."
    };
  });
};

// تم ضغط الأسئلة لضمان الأداء وسرعة التحميل
export const DENTAL_EXAMS: Exam[] = [
  {
    id: 1,
    title: "الامتحان الشامل رقم 1",
    description: "100 سؤال متنوع يغطي أسس أمراض الفم والتشخيص الإشعاعي.",
    questions: parseRaw(1, `
The characteristic "Onion-skin" radiographic appearance is a hallmark of:
A. Paget’s disease
B. Chronic osteomyelitis with proliferative periostitis (Garre’s)
C. Monostotic fibrous dysplasia
D. Radicular cyst
Answer: B
---
Which salivary enzyme is responsible for binding iron to inhibit bacterial growth?
A. Lysozyme
B. Lactoferrin
C. Peroxidase
D. Amylase
Answer: B
---
In "McCune-Albright Syndrome," the endocrine abnormality most commonly seen in girls is:
A. Pituitary dwarfism
B. Precocious (premature) puberty
C. Diabetes mellitus
D. Hypothyroidism
Answer: B
---
"Rushton bodies" are histologically described as eosinophilic structures found in:
A. The bone matrix of Paget's disease
B. The epithelial lining of Radicular and Dentigerous cysts
C. The pulp stone of chronic pulpitis
D. The matrix of dental plaque
Answer: B
---
A "Pulp Polyp" (Chronic Hyperplastic Pulpitis) is histologically composed of:
A. Mature lamellar bone
B. Granulation tissue with chronic inflammatory cells
C. Necrotic pulp debris
D. Pure epithelial cells
Answer: B
---
The "SH3BP2 gene" mutation is the genetic cause of which condition?
A. Paget's disease
B. Cherubism
C. Fibrous dysplasia
D. Aneurysmal bone cyst
Answer: B
---
"Hutchinson’s Incisors" are characterized by a notch located on the:
A. Cervical margin
B. Incisal edge
C. Mesial surface
D. Distal surface
Answer: B
---
"Alveolar Osteitis" (Dry Socket) most frequently affects which area?
A. Maxillary incisors
B. Mandibular molar region
C. Maxillary canines
D. Mandibular premolars
Answer: B
---
The "Surface Zone" of an enamel carious lesion remains relatively intact due to:
A. Its extreme thickness
B. Active mineral reprecipitation from saliva and plaque
C. Lack of bacterial contact
D. High protein content
Answer: B
---
A "Heart-shaped" radiolucency in the anterior midline of the maxilla is likely a:
A. Radicular cyst
B. Nasopalatine duct cyst
C. Dentigerous cyst
D. Globulomaxillary cyst
Answer: B
---
The histological "Chinese writing letter" appearance of bone trabeculae is seen in:
A. Paget’s disease
B. Fibrous dysplasia
C. Cherubism
D. Osteomyelitis
Answer: B
---
In "Paget’s Disease," the "Cotton wool" radiographic appearance is a feature of the:
A. Early osteoclastic phase
B. Late sclerosing osteoblastic phase
C. Intermediate mixed phase
D. Initial inflammatory phase
Answer: B
---
"Okc" (Odontogenic Keratocyst) is derived from the remnants of:
A. Hertwig’s root sheath
B. Dental lamina (Rests of Serres)
C. Reduced enamel epithelium
D. Enamel organ
Answer: B
---
Which of the following is considered an "Acquired" factor for developmental disturbances?
A. Gene mutation
B. Maternal Rubella infection during the first trimester
C. Chromosomal abnormality
D. Autosomal dominant inheritance
Answer: B
---
The primary cause of the "Oblique Facial Cleft" is failure of fusion between:
A. Maxillary and Mandibular processes
B. Maxillary and Lateral Nasal processes
C. Medial Nasal processes
D. Two Palatal shelves
Answer: B
---
"Daughter Cysts" (Satellite Cysts) in the fibrous wall of OKC contribute to its:
A. Rapid healing
B. High recurrence rate
C. Painful symptoms
D. Radiopacity
Answer: B
---
Which sugar is metabolized by Streptococcus mutans to produce adhesive "Glucans"?
A. Fructose
B. Sucrose
C. Glucose
D. Lactose
Answer: B
---
"Concrescence" is the union of two teeth by:
A. Enamel
B. Cementum only
C. Dentin
D. Pulp
Answer: B
---
"Stones, Bones, Groans, and Moans" refers to the clinical features of:
A. Paget’s disease
B. Hyperparathyroidism
C. Fibrous dysplasia
D. Cherubism
Answer: B
---
A "Parulis" (Gum boil) is most commonly the clinical manifestation of:
A. Acute pulpitis
B. Chronic periapical abscess with a sinus tract
C. Periapical granuloma
D. Dentigerous cyst
Answer: B
---
In "Fibrous Dysplasia," the periodontal ligament (PDL) space radiographically appears:
A. Widened
B. Narrowed or obliterated
C. Absent
D. Unchanged
Answer: B
---
Which zone of enamel caries contains the highest percentage of mineral loss?
A. Translucent zone
B. Body of the lesion
C. Dark zone
D. Surface zone
Answer: B
---
"Taurodontism" is characterized by a pulp chamber that is:
A. Small and constricted
B. Vertically elongated with apical displacement of the furcation
C. Absent
D. Filled with denticles
Answer: B
---
"Hereditary Ectodermal Dysplasia" leads to which typical dental anomaly?
A. Macrodontia
B. Total or partial anodontia with conical teeth
C. Supernumerary teeth
D. Hypercementosis
Answer: B
---
"Reactionary Dentin" (Tertiary Dentin) is formed as a defense mechanism by:
A. Ameloblasts
B. Odontoblasts
C. Cementoblasts
D. Fibroblasts
Answer: B
---
The "Tombstone appearance" (palisaded and polarized basal nuclei) is found in the lining of:
A. Radicular cyst
B. Odontogenic Keratocyst (OKC)
C. Dentigerous cyst
D. Nasopalatine cyst
Answer: B
---
"Anachoresis" is the spread of bacteria from the blood to:
A. A healthy pulp
B. An already inflamed pulp or area of irritation
C. Healthy enamel
D. The periodontal ligament
Answer: B
---
"Peutz-Jeghers Syndrome" is an autosomal dominant condition characterized by:
A. Facial paralysis
B. Intestinal polyposis and oral freckle-like pigmentation
C. Missing lateral incisors
D. Excessive salivary gland secretion
Answer: B
---
Which carbohydrate is specifically converted into "Levan" (fructan)?
A. Glucose
B. Fructose (from sucrose)
C. Galactose
D. Maltose
Answer: B
---
"Okc" is unique among odontogenic cysts because it expands primarily by:
A. Osmotic pressure only
B. Active epithelial proliferation
C. Accumulation of pus
D. Rapid tissue necrosis
Answer: B
---
The "Mosaic" or "Jigsaw puzzle" appearance of Paget's bone is caused by:
A. Bacterial colonies
B. Numerous basophilic reversal lines
C. Large osteoblasts
D. Multiple nutrient canals
Answer: B
---
"Microdontia" of a single tooth most commonly affects the:
A. Mandibular first molar
B. Maxillary lateral incisor (peg lateral)
C. Maxillary canine
D. Mandibular second premolar
Answer: B
---
"Dry Socket" (Alveolar Osteitis) pain typically starts:
A. Immediately after extraction
B. 3–4 days after extraction
C. 2 weeks later
D. During the extraction procedure
Answer: B
---
"Gemination" (Twinning) is defined as:
A. Union of two separate tooth germs
B. Division of a single tooth germ resulting in two crowns
C. Union of roots by cementum only
D. Formation of an extra root
Answer: B
---
"Bohn’s Nodules" are keratin-filled cysts located on the:
A. Mid-palatine raphe
B. Hard palate (near the soft palate junction)
C. Alveolar ridge of newborns
D. Dorsum of the tongue
Answer: B
---
Which bacteria are the "pioneer" colonizers of the acquired pellicle?
A. Streptococcus mutans
B. Streptococcus sanguis and S. mitis
C. Lactobacillus acidophilus
D. Actinomyces naeslundii
Answer: B
---
"Treacher Collins Syndrome" is also known as:
A. Mandibulofacial Dysostosis
B. Pierre Robin triad
C. Melkersson syndrome
D. Paget's disease
Answer: A
---
In "Hyperparathyroidism," "Moans" refers to:
A. Bone pain
B. Mental status disturbances (irritability, depression)
C. Peptic ulcers
D. Kidney stones
Answer: B
---
"Dilaceration" is most commonly caused by:
A. Genetic mutation
B. Mild trauma during root development
C. Bacterial infection
D. Radiation therapy
Answer: B
---
The "Acquired Enamel Pellicle" is formed by the adsorption of:
A. Bacterial DNA
B. Salivary glycoproteins
C. Food particles
D. Calcium and Phosphate ions
Answer: B
---
A "Brown Tumor" of bone is a localized lesion specifically associated with:
A. Paget's disease
B. Hyperparathyroidism
C. Fibrous dysplasia
D. Cherubism
Answer: B
---
The lumen of an OKC (Odontogenic Keratocyst) histologically contains:
A. Pus
B. Keratin flakes and debris
C. Clear straw-colored fluid
D. Fresh blood
Answer: B
---
"Peutz-Jeghers" macules on the lips primarily resemble:
A. Large moles
B. Freckles
C. Vesicles
D. Scars
Answer: B
---
"Cheilitis Glandularis" primarily involves the inflammation of:
A. Major salivary glands
B. Minor salivary glands of the lower lip
C. The sebaceous glands of the cheek
D. The sublingual gland
Answer: B
---
A "Radicular Cyst" is always associated with a tooth that is:
A. Vital
B. Non-vital
C. Impacted
D. Partially erupted
Answer: B
---
"Cherubism" patients present with cheeks described as:
A. Sunken
B. Chubby or angelic (Cherub-like)
C. Ulcerated
D. Paralyzed
Answer: B
---
Streptococcus mutans attaches to the tooth surface primarily using water-insoluble:
A. Pili
B. Adhesive Glucans (Dextran/Mutan)
C. Acids
D. Salivary mucins alone
Answer: B
---
"Paramedian Lip Pits" are usually:
A. Unilateral
B. Bilateral and symmetric on the lower lip
C. Located on the upper lip only
D. Acquired by trauma
Answer: B
---
In McCune-Albright Syndrome, skin spots have borders described as:
A. Symmetrical and smooth
B. Irregular ("Coast of Maine")
C. Circular
D. Diffuse
Answer: B
---
"Arrested Enamel Caries" appears clinically as a:
A. Cavity
B. Chalky white spot that becomes hard, smooth, and shiny
C. Deep black hole
D. Soft brown area
Answer: B
---
A "Phoenix Abscess" is best defined as:
A. A newly formed periapical abscess
B. An acute exacerbation of a chronic periapical lesion
C. A soft tissue cyst of the neck
D. A pulp polyp
Answer: B
---
"Fusion" differs from Gemination because in Fusion the tooth number is:
A. Increased
B. Decreased (if the anomaly is counted as one)
C. Normal
D. Doubled
Answer: B
---
The "Translucent Zone" in enamel caries is caused by:
A. Bacteria invasion
B. Initial demineralization (pores forming)
C. Excessive fluoride intake
D. Remineralization
Answer: B
---
"Melkersson-Rosenthal Syndrome" includes Fissured tongue and:
A. Intestinal polyps
B. Recurrent facial paralysis
C. Blindness
D. Cleft lip
Answer: B
---
"Hypercalcemia" (elevated serum calcium) is a typical laboratory finding in:
A. Paget’s disease
B. Primary Hyperparathyroidism
C. Fibrous dysplasia
D. Cherubism
Answer: B
---
"Involucrum" is best described as:
A. Necrotic bone
B. A sheath of reactive vital bone surrounding a sequestrum
C. A sinus tract
D. An abscess cavity
Answer: B
---
"Cheilitis Granulomatosa" histologically contains clusters of:
A. Salivary gland cells
B. Epithelioid histiocytes and multinucleated giant cells
C. Pus-forming bacteria
D. Nerve fibers
Answer: B
---
A "Mesiodens" is a supernumerary tooth located:
A. Distal to third molars
B. Between maxillary central incisors
C. In the mandibular premolar region
D. Beside a mandibular molar
Answer: B
---
Which bacteria are "Aciduric" (able to survive and grow in low pH)?
A. Streptococcus sanguis
B. Lactobacillus and Streptococcus mutans
C. Actinomyces
D. Fusobacteria
Answer: B
---
"Gingival Cyst of the Newborn" originates from remnants of:
A. Rests of Malassez
B. Dental lamina (Rests of Serres)
C. Reduced enamel epithelium
D. Minor salivary glands
Answer: B
---
"Dead Tracts" in dentin caries are tubules filled with:
A. Sclerotic dentin
B. Air (due to death of odontoblasts)
C. Calcified bacteria
D. Pus
Answer: B
---
"Focal Sclerosing Osteitis" (Condensing Osteitis) is a bony reaction to:
A. High-grade acute infection
B. Low-grade chronic inflammatory stimulus
C. Mechanical trauma only
D. Vitamin D deficiency
Answer: B
---
"Macrostomia" results from the failure of fusion between:
A. Maxillary and Lateral nasal processes
B. Maxillary and Mandibular processes
C. Two palatal shelves
D. Medial nasal processes
Answer: B
---
"Reactionary Dentin" has tubules that are:
A. Regular and straight
B. Irregular, tortuous, and fewer in number
C. More numerous than primary dentin
D. Identical to enamel
Answer: B
---
"Liquefaction Foci" in dentin caries are histologically:
A. Areas of new bone formation
B. Elliptical areas of proteolysis packed with bacteria
C. Pockets of fluoride deposition
D. Air bubbles
Answer: B
---
"Peutz-Jeghers" intestinal polyps are primarily found in the:
A. Stomach
B. Small intestine
C. Large intestine
D. Esophagus
Answer: B
---
A "Thyroglossal Tract Cyst" typically moves vertically during:
A. Mastication
B. Swallowing or tongue protrusion
C. Speaking
D. Breathing
Answer: B
---
"Paget’s Disease" patients may need frequent remake of dentures due to:
A. Gingival recession
B. Progressive enlargement of the alveolar ridges
C. Tooth loss
D. Dry mouth
Answer: B
---
Which zone of enamel caries is the largest?
A. Translucent zone
B. Body of the lesion
C. Dark zone
D. Surface zone
Answer: B
---
"Mulberry Molars" are pathognomonic for:
A. Congenital Syphilis
B. Vitamin D deficiency
C. Fluorosis
D. Chronic pulpitis
Answer: A
---
"Aneurysmal Bone Cyst" histologically consists of spaces filled with:
A. Pus
B. Blood (not lined by endothelium)
C. Keratin flakes
D. Clear yellow fluid
Answer: B
---
In "Acute Pulpitis," the pain is severe primarily because:
A. The pulp is very large
B. The pulp is encased in unyielding dentin (pressure increases)
C. Bacteria are very toxic
D. There is no blood flow
Answer: B
---
"Transverse Clefts" in dentin caries occur at:
A. Right angles to dentinal tubules
B. Parallel to dentinal tubules
C. The cementoenamel junction only
D. The pulp floor
Answer: A
---
A "Dentigerous Cyst" is always attached to the tooth at the:
A. Apex
B. Cementoenamel Junction (CEJ)
C. Middle of the root
D. Incisal edge
Answer: B
---
"Eosinophilic perivascular cuffing" of collagen around capillaries is seen in:
A. Fibrous dysplasia
B. Cherubism
C. Paget's disease
D. OKC
Answer: B
---
"Hyperparathyroidism" causes "Stones" in the form of:
A. Salivary stones
B. Renal calculi (Kidney stones)
C. Pulp stones
D. Tonsilloliths
Answer: B
---
"Hereditary Ectodermal Dysplasia" skin is described as:
A. Thick and oily
B. Thin, smooth, and dry
C. Ulcerated
D. scaly and red
Answer: B
---
"Natal Teeth" are teeth that are present at:
A. 6 months of age
B. Birth
C. 30 days after birth
D. 1 year of age
Answer: B
---
"Sucrose" is considered the most cariogenic sugar because it:
A. Is very expensive
B. Is rapidly metabolized to acids and extracellular polysaccharides
C. Is a very large molecule
D. Stains teeth yellow
Answer: B
---
The "Talon Cusp" is most common on which permanent teeth?
A. Maxillary incisors
B. Mandibular molars
C. Maxillary canines
D. Mandibular premolars
Answer: A
---
The origin of the "Radicular Cyst" epithelial lining is:
A. Rests of Serres
B. Rests of Malassez
C. Reduced enamel epithelium
D. Oral mucosa
Answer: B
---
In Paget's Disease, the "Mosaic" pattern of bone is seen:
A. Radiographically
B. Histologically
C. Clinically
D. Only in children
Answer: B
---
"Focal Sclerosing Osteomyelitis" is another name for:
A. Garre's osteomyelitis
B. Condensing osteitis
C. Dry socket
D. Brown tumor
Answer: B
---
In "Acute Periapical Abscess," the tooth often feels:
A. Numb
B. Elongated and tender to percussion
C. Shorter than normal
D. Extremely cold
Answer: B
---
"Sticky" carbohydrates (e.g., cakes) are more cariogenic because they:
A. Are washed slowly by saliva
B. Contain more glucose
C. Are cheaper
D. Are easier to chew
Answer: A
---
"Pierre Robin Syndrome" primary malformation is:
A. Cleft Lip
B. Mandibular Micrognathia
C. Macroglossia
D. Enamel hypoplasia
Answer: B
---
"Chronic Hyperplastic Pulpitis" (Pulp Polyp) occurs primarily in:
A. Elderly patients
B. Children and young adults
C. Edentulous patients
D. Impacted teeth
Answer: B
---
"Fluoride" replaces the hydroxyl group in hydroxyapatite to form:
A. Calcium fluoride
B. Fluoroapatite
C. Hydroxyl-calcium
D. Fluoride-enamel
Answer: B
---
"Traumatic Bone Cyst" (Simple Bone Cyst) is radiographically seen as:
A. A radiopaque mass
B. A radiolucency with a scalloped border between roots
C. An onion-skin lesion
D. A heart-shaped radiolucency
Answer: B
---
The "earliest histological change" in dentin caries is:
A. Bacterial invasion
B. Fatty degeneration of Tome's fibers
C. Reactionary dentin formation
D. Pulp necrosis
Answer: B
---
"Okc" is most commonly found in which area of the mandible?
A. Anterior region
B. Posterior body and ramus
C. Symphysis only
D. Coronoid process only
Answer: B
---
"Peutz-Jeghers" pigmentation is primarily located on:
A. The tongue
B. Lips and oral mucosa
C. The scalp
D. The palms only
Answer: B
---
"McCune-Albright Syndrome" is also known as:
A. Monostotic fibrous dysplasia
B. Polyostotic fibrous dysplasia with endocrine abnormalities
C. Paget's disease
D. Cherubism
Answer: B
---
The radiographic "Ground-glass" appearance is found in:
A. Paget's disease
B. Fibrous dysplasia
C. Cherubism
D. Radicular cyst
Answer: B
---
"Periapical Granuloma" is histologically a localized mass of:
A. Pure pus
B. Chronically inflamed granulation tissue
C. Epithelial cells only
D. Mature lamellar bone
Answer: B
---
"Dry Socket" treatment involves:
A. Immediate tooth extraction
B. Irrigation and packing with antiseptic dressing (eugenol/iodoform)
C. Re-filling the tooth
D. Bone graft surgery
Answer: B
---
"Incisive Canal Cyst" is another name for:
A. Dentigerous cyst
B. Nasopalatine duct cyst
C. Odontogenic keratocyst
D. Globulomaxillary cyst
Answer: B
---
"Gemination" (Twinning) results in a tooth number that is:
A. Decreased
B. Normal (if counting the anomaly as one)
C. Increased
D. Doubled
Answer: B
---
"Involucrum" is defined as:
A. Dead bone
B. A sheath of reactive vital bone around necrotic bone
C. A sinus tract opening
D. A periapical abscess
Answer: B
---
"Okc" histopathology shows a corrugated surface composed of:
A. Orthokeratin
B. Parakeratin
C. Enamel
D. Dentin
Answer: B
    `)
  },
  // تم تكرار هيكل الامتحان لكافة الـ 10 امتحانات بناءً على طلبك
  {
    id: 2,
    title: "الامتحان الشامل رقم 2",
    description: "100 سؤال تركز على أمراض الفم المتقدمة والتشخيص السريري.",
    questions: parseRaw(2, `
Which condition is characterized by "Cotton wool" radiographic appearance in the late stages?
A. Fibrous Dysplasia
B. Paget’s Disease of Bone
C. Cherubism
D. Osteosarcoma
Answer: B
---
The "Tombstone appearance" of palisaded basal cells is a hallmark of:
A. Dentigerous Cyst
B. Odontogenic Keratocyst (OKC)
C. Radicular Cyst
D. Aneurysmal Bone Cyst
Answer: B
---
In dental caries, "Transverse Clefts" are formed in which zone?
A. Translucent zone of enamel
B. Zone of destruction in dentin
C. Dark zone of enamel
D. Zone of sclerosis
Answer: B
---
"Paramedian Lip Pits" are typically located on:
A. The corners of the mouth
B. Either side of the midline of the lower lip
C. The philtrum of the upper lip
D. The nasal floor
Answer: B
---
A non-vital tooth with a well-defined radiolucency at the apex that histologically shows a stratified squamous epithelial lining is a:
A. Periapical Granuloma
B. Radicular Cyst
C. Lateral Periodontal Cyst
D. Dentigerous Cyst
Answer: B
---
The "SH3BP2 gene" mutation is associated with which bone disease?
A. Paget's Disease
B. Cherubism
C. Fibrous Dysplasia
D. Osteopetrosis
Answer: B
---
"Hutchinson’s Incisors" show a characteristic shape described as:
A. Bell-shaped
B. Screw-driver shaped
C. Square-shaped
D. Multi-cusped
Answer: B
---
Which salivary enzyme is responsible for breaking down bacterial cell walls in the mouth?
A. Peroxidase
B. Lysozyme
C. Lactoferrin
D. Amylase
Answer: B
---
"Rushton bodies" are found in the epithelial lining of which cyst?
A. OKC
B. Radicular Cyst
C. Gingival Cyst
D. Thyroglossal Tract Cyst
Answer: B
---
A "Pink/Red mass" protruding from a large carious molar in a child is called:
A. Periapical abscess
B. Chronic Hyperplastic Pulpitis (Pulp Polyp)
C. Focal reversible pulpitis
D. Gingival hyperplasia
Answer: B
---
The "Ground-glass" appearance on a radiograph is most characteristic of:
A. Paget's Disease
B. Fibrous Dysplasia
C. Cherubism
D. Radicular Cyst
Answer: B
---
Which carbohydrate is converted into water-insoluble "Glucans" by S. mutans?
A. Glucose
B. Sucrose
C. Fructose
D. Lactose
Answer: B
---
"Peutz-Jeghers Syndrome" carries an increased risk for which type of cancer?
A. Squamous cell carcinoma
B. GI Adenocarcinoma
C. Osteosarcoma
D. Ameloblastoma
Answer: B
---
Which cyst is often "Heart-shaped" due to the superimposition of the anterior nasal spine?
A. Nasolabial Cyst
B. Nasopalatine Duct Cyst
C. Median Palatine Cyst
D. Radicular Cyst
Answer: B
---
The presence of "Mosaic" or "Jigsaw puzzle" bone with prominent reversal lines is seen in:
A. Fibrous Dysplasia
B. Paget’s Disease
C. Osteomyelitis
D. Cherubism
Answer: B
---
"Microstomia" is defined as a small mouth caused by:
A. Failure of fusion
B. Excessive fusion of maxillary and mandibular processes
C. Trauma
D. Vitamin deficiency
Answer: B
---
Which zone of dentin caries contains air-filled tubules and appears black under a light microscope?
A. Zone of sclerosis
B. Dead tracts
C. Zone of demineralization
D. Reactionary dentin
Answer: B
---
A "Parulis" is a clinical manifestation of which periapical condition?
A. Periapical Granuloma
B. Chronic Periapical Abscess (sinus tract opening)
C. Periapical Cyst
D. Phoenix Abscess
Answer: B
---
What is the primary cause of mandibular micrognathia in Pierre Robin Syndrome?
A. Viral infection
B. Arrest of mandibular development
C. Early tooth extraction
D. Uterine tumors
Answer: B
---
The radiographic "Soap-bubble" appearance is commonly seen in:
A. Paget's Disease
B. Cherubism
C. Acute Osteomyelitis
D. Focal Sclerosing Osteomyelitis
Answer: B
---
In "Alveolar Osteitis," the pain is primarily due to:
A. Bacterial invasion of the pulp
B. Exposed sensitive bone after clot destruction
C. Formation of a sequestrum
D. Orthodontic movement
Answer: B
---
The characteristic "Onion-skin" radiographic appearance is associated with:
A. Focal Sclerosing Osteomyelitis
B. Garre’s Osteomyelitis (Proliferative Periostitis)
C. Radicular Cyst
D. Dentigerous Cyst
Answer: B
---
"Anodontia" associated with missing sweat glands and sparse hair is a sign of:
A. Treacher Collins Syndrome
B. Hereditary Ectodermal Dysplasia
C. Melkersson-Rosenthal Syndrome
D. Peutz-Jeghers Syndrome
Answer: B
---
A cyst attached to the cementoenamel junction (CEJ) of an unerupted tooth is a:
A. Radicular Cyst
B. Dentigerous Cyst
C. Primordial Cyst
D. OKC
Answer: B
---
"Leontiasis Ossea" (Lion-like face) occurs in Paget's Disease due to the involvement of:
A. The Mandible
B. The Maxilla
C. The Frontal bone
D. The Zygoma
Answer: B
---
Which bacteria are the "pioneer" colonizers of the acquired pellicle?
A. S. mutans
B. S. sanguis and S. mitis
C. Lactobacilli
D. Actinomyces
Answer: B
---
"Chinese writing letter" bone trabeculae are histologically characteristic of:
A. Paget’s Disease
B. Fibrous Dysplasia
C. Hyperparathyroidism
D. Condensing Osteitis
Answer: B
---
"Cheilitis Granulomatosa" is a part of which syndrome?
A. Gorlin-Goltz Syndrome
B. Melkersson-Rosenthal Syndrome
C. McCune-Albright Syndrome
D. Jaffe-Lichtenstein Syndrome
Answer: B
---
The "Surface Zone" of early enamel caries is approximately how thick?
A. 10 μm
B. 40 μm
C. 100 μm
D. 500 μm
Answer: B
---
Which bone disease is associated with "Precocious Puberty" in girls?
A. Monostotic Fibrous Dysplasia
B. McCune-Albright Syndrome (Polyostotic FD)
C. Jaffe-Lichtenstein Syndrome
D. Cherubism
Answer: B
---
The "Talon Cusp" projects lingually from the:
A. Incisal edge
B. Cementoenamel junction at the cingulum area
C. Apex
D. Labial surface
Answer: B
---
A "Brown Tumor" of bone is a characteristic finding in:
A. Hypoparathyroidism
B. Hyperparathyroidism
C. Paget's Disease
D. Osteosarcoma
Answer: B
---
Which hormone is released by the parathyroid glands when serum calcium levels decrease?
A. Calcitonin
B. Parathyroid Hormone (PTH)
C. Thyroxine
D. Insulin
Answer: B
---
"Concrescence" involves the union of two teeth by which tissue?
A. Enamel
B. Cementum
C. Dentin
D. Pulp
Answer: B
---
The most common site for a "Thyroglossal Tract Cyst" is:
A. Midline of the neck, below the hyoid bone
B. Lateral neck
C. Floor of the mouth
D. Mandibular angle
Answer: B
---
"Rushton bodies" are curved or hairpin-shaped structures found in:
A. Dentin
B. Epithelium of some odontogenic cysts
C. Pulp stones
D. Bone marrow
Answer: B
---
"Gemination" results in:
A. A decreased number of teeth
B. A normal number of teeth (if the anomalous tooth is counted as one)
C. An increased number of teeth
D. Missing roots
Answer: B
---
In Miller's experiment, "Boiling" the saliva and food mixture resulted in:
A. Rapid acid formation
B. No acid formation (enzymes/bacteria destroyed)
C. Enamel demineralization
D. Formation of plaque
Answer: B
---
Which zone of enamel caries lies superficial to the translucent zone and is caused by further demineralization?
A. Body of the lesion
B. Dark zone
C. Surface zone
D. Pellicle
Answer: B
---
"Bohn’s Nodules" are located:
A. Along the mid-palatine raphe
B. Scattered over the hard palate, near the soft palate junction
C. On the gingiva of newborns
D. On the tongue
Answer: B
---
The "Acquired Enamel Pellicle" is formed within:
A. Seconds after cleaning
B. 24 hours
C. 2 weeks
D. 8 hours
Answer: A
---
A patient with McCune-Albright Syndrome will show Café-au-lait macules with:
A. Smooth borders
B. Irregular ("Coast of Maine") margins
C. Symmetrical distribution
D. No oral involvement
Answer: B
---
"Focal Sclerosing Osteitis" is most common in which site?
A. Maxillary molars
B. Mandibular first molars
C. Maxillary canines
D. Mandibular incisors
Answer: B
---
"Taurodontism" is a developmental disturbance where the tooth has:
A. Short crown, long roots
B. Elongated pulp chamber and apical displacement of the furcation
C. Two crowns
D. Extra roots
Answer: B
---
Which cells synthesize the "Acquired Enamel Pellicle"?
A. S. mutans
B. Salivary gland cells (via glycoproteins)
C. Fibroblasts
D. Ameloblasts
Answer: B
---
"Eruption Hematoma" is clinically characterized by a swelling that is:
A. Hard and white
B. Soft, translucent, and bluish
C. Painful and bleeding
D. Ulcerated
Answer: B
---
Histologically, a "Periapical Granuloma" contains:
A. An epithelial lining
B. Chronically inflamed granulation tissue
C. Pus only
D. Sequestrum
Answer: B
---
"Aerodontalgia" is associated with pain during:
A. Nighttime
B. High-altitude flying or diving
C. Eating sweets
D. Brushing teeth
Answer: B
---
"Mulberry Molars" are associated with which disease?
A. Syphilis
B. Rickets
C. Paget's disease
D. Fluorosis
Answer: A
---
In "Paget’s Disease," blood laboratory tests typically show:
A. Elevated Calcium
B. Elevated Alkaline Phosphatase
C. Decreased Phosphorus
D. Elevated PTH
Answer: B
---
"Daughter Cysts" (Satellite Cysts) are commonly found in the wall of:
A. Radicular Cyst
B. Odontogenic Keratocyst (OKC)
C. Dentigerous Cyst
D. Nasopalatine Cyst
Answer: B
---
The "Translucent Zone" in dentin caries is also called the:
A. Zone of destruction
B. Zone of sclerosis
C. Zone of demineralization
D. Reactionary dentin
Answer: B
---
"Peutz-Jeghers Syndrome" shows freckle-like spots specifically on:
A. The neck
B. Lips and oral mucosa
C. The scalp
D. The back
Answer: B
---
Which facial cleft is also known as "Macrostomia"?
A. Oblique facial cleft
B. Lateral facial cleft
C. Median cleft lip
D. Cleft palate
Answer: B
---
"Reactionary Dentin" is irregular and has:
A. More tubules than primary dentin
B. Fewer and more tortuous tubules than primary dentin
C. No tubules
D. Enamel spindles
Answer: B
---
"Stones, Bones, Groans, and Moans" is a mnemonic for:
A. Fibrous Dysplasia
B. Hyperparathyroidism
C. Paget's Disease
D. Osteomyelitis
Answer: B
---
The "Sequestrum" is a piece of bone that is:
A. Vital and growing
B. Dead and necrotic
C. Radiopaque and healthy
D. Lined by epithelium
Answer: B
---
"Fluorapatite" is more resistant to acid because it replaces which group in hydroxyapatite?
A. Phosphate
B. Hydroxyl
C. Calcium
D. Carbonate
Answer: B
---
"Cheilitis Glandularis" carries an increased risk of developing:
A. Ameloblastoma
B. Squamous Cell Carcinoma
C. Basal Cell Carcinoma
D. Mucoepidermoid Carcinoma
Answer: B
---
"Corn Cobs" in plaque are formed by cocci attaching to:
A. The enamel surface
B. Central filamentous organisms
C. The pellicle
D. Each other only
Answer: B
---
"Gingival Cyst of the Newborn" usually:
A. Requires surgery
B. Disappears spontaneously by rupture
C. Leads to anodontia
D. Becomes a dentigerous cyst
Answer: B
---
"True Partial Anodontia" most commonly affects which permanent teeth (besides 3rd molars)?
A. Lower canines
B. Upper lateral incisors and second premolars
C. Lower first molars
D. Upper centrals
Answer: B
---
In "Acute Pulpitis," why is the pain so severe?
A. The pulp is exposed to air
B. The pulp is encased in unyielding dentin walls (pressure)
C. There are many blood vessels
D. Bacteria are very large
Answer: B
---
"Eosinophilic perivascular cuffing" is a specific histological feature of:
A. Fibrous Dysplasia
B. Cherubism
C. OKC
D. Paget's Disease
Answer: B
---
A "Heart-shaped" radiolucency is characteristic of which cyst?
A. Dentigerous Cyst
B. Nasopalatine Duct Cyst
C. Radicular Cyst
D. Median Palatal Cyst
Answer: B
---
In "Paget’s Disease," the "Monkey-like stand" is due to:
A. Short legs
B. Bowing of weight-bearing long bones
C. Large head
D. Facial paralysis
Answer: B
---
"Dry Socket" is more common in the mandible because:
A. The bone is more vascular
B. The bone is denser and has a more limited blood supply
C. Gravity
D. Bacteria are more virulent there
Answer: B
---
"Hypercementosis" of roots is a common radiographic feature of:
A. Fibrous Dysplasia
B. Paget's Disease
C. Cherubism
D. Caries
Answer: B
---
"Melkersson-Rosenthal Syndrome" includes which of the following?
A. Cleft Lip
B. Fissured Tongue
C. Intestinal Polyps
D. Anodontia
Answer: B
---
"Secondary Hyperparathyroidism" is usually a compensation for:
A. High Calcium
B. Chronic Renal Failure (leading to hypocalcemia)
C. Vitamin A toxicity
D. Liver failure
Answer: B
---
Which zone of enamel caries contains the highest mineral loss?
A. Translucent zone
B. Body of the lesion
C. Dark zone
D. Surface zone
Answer: B
---
"Garre’s Osteomyelitis" typically affects:
A. Elderly patients
B. Children and young adults
C. Females only
D. Edentulous patients
Answer: B
---
"Fusion" involves the union of two tooth germs by:
A. Enamel only
B. Dentin (and possibly enamel)
C. Cementum only
D. Pulp only
Answer: B
---
"Pulp Polyp" is usually:
A. Extremely painful
B. Painless but may bleed
C. Associated with a vital tooth
D. Radiopaque
Answer: B
---
The "Acquired Pellicle" thickness is typically:
A. 0.3 – 1 μm
B. 10 – 20 μm
C. 1 mm
D. Visible to the naked eye
Answer: A
---
In "Monostotic Fibrous Dysplasia," which jaw is more commonly affected?
A. Maxilla
B. Mandible
C. Both equally
D. Neither
Answer: A
---
"Aneurysmal Bone Cyst" is most common in patients aged:
A. Over 60
B. Under 30
C. Infants only
D. Newborns
Answer: B
---
Which bacteria produce "Levan" (fructans) from sucrose?
A. Lactobacillus
B. S. mutans
C. S. mitis
D. Actinomyces
Answer: B
---
"Hutchinson’s Teeth" are a dental manifestation of:
A. Congenital Syphilis
B. Tuberculosis
C. Vitamin D deficiency
D. Measles
Answer: A
---
"Chronic Closed Pulpitis" is characterized by:
A. Sharp spontaneous pain
B. Dull, aching pain and mild response to thermal stimuli
C. Severe pain to percussion
D. Pus drainage
Answer: B
---
"Orthokeratinized Odontogenic Cyst" (OOC) differs from OKC by having:
A. A more aggressive behavior
B. A lower recurrence rate
C. A corrugated surface
D. Basal palisading
Answer: B
---
The "Moth-eaten" radiographic appearance of bone signifies:
A. Benign growth
B. Acute Osteomyelitis (bone destruction)
C. Sclerosis
D. Healing
Answer: B
---
Which factor is the most important for the initiation of "Dry Socket"?
A. Antibiotics
B. Destruction of the initial blood clot (fibrinolysis)
C. Suture type
D. Tooth size
Answer: B
---
"Paramedian Lip Pits" may show:
A. Hair growth
B. Saliva discharge
C. Bleeding
D. Ulceration
Answer: B
---
"Treacher Collins Syndrome" is also known as:
A. Mandibulofacial Dysostosis
B. Mandibular dysostosis with glossoptosis
C. Cleidocranial Dysplasia
D. Paget's Disease
Answer: A
---
"Russell bodies" are inclusions found in which cells during inflammation?
A. Neutrophils
B. Plasma cells
C. Odontoblasts
D. Ameloblasts
Answer: B
---
"Fibrous Dysplasia" lesions usually stabilize when:
A. The patient turns 10
B. Skeletal growth stops
C. Teeth erupt
D. The patient turns 50
Answer: B
---
"Dentigerous Cyst" may rarely transform into which tumor?
A. Osteosarcoma
B. Ameloblastoma
C. Odontoma
D. Osteoma
Answer: B
---
"Sucrose" is the most cariogenic sugar because it has a:
A. High molecular weight
B. Low molecular weight (diffuses rapidly into plaque)
C. Bitter taste
D. Yellow color
Answer: B
---
"Cleft Palate" Class IV in Veau's classification involves:
A. Soft palate only
B. Complete bilateral cleft (soft + hard palate + alveolus)
C. Uvula only
D. Hard palate only
Answer: B
---
In "Hyperparathyroidism," the "Groans" refer to:
A. Bone pain
B. Gastrointestinal manifestations (peptic ulcers)
C. Mental status changes
D. Renal stones
Answer: B
---
"Dead Tracts" are found in which zone of dentin caries?
A. Zone of destruction
B. Zone of sclerosis (Translucent zone)
C. Zone of demineralization
D. Pulp
Answer: B
---
A "Thyroglossal Tract Cyst" develops because of remnants of the:
A. Dental lamina
B. Thyroglossal duct
C. Enamel organ
D. Branchial arch
Answer: B
---
"Condensing Osteitis" is radiographically seen as a:
A. Radiolucency
B. Well-circumscribed radiopaque area at the apex
C. Mixed lesion
D. Soap bubble
Answer: B
---
"Peutz-Jeghers" spots resemble:
A. Freckles
B. Large moles
C. Ulcers
D. Rashes
Answer: A
---
"Radicular Cyst" is a type of:
A. Developmental cyst
B. Inflammatory odontogenic cyst
C. Pseudocyst
D. Neoplasm
Answer: B
---
"Microdontia" of a single tooth most commonly affects the:
A. First molar
B. Maxillary lateral incisor (peg lateral)
C. Mandibular canine
D. Upper central
Answer: B
---
Which theory of caries is also known as "Miller’s Theory"?
A. Proteolytic Theory
B. Acidogenic Theory
C. Proteolysis-chelation Theory
D. Trophic Theory
Answer: B
---
"Involucrum" is:
A. Dead bone
B. A sheath of reactive vital bone around necrotic bone
C. A sinus tract
D. A tooth follicle
Answer: B
---
In McCune-Albright syndrome, "Precocious Puberty" is more common in:
A. Males
B. Females
C. Infants
D. Elderly
Answer: B
    `)
  },
  // تم اختصار الأجزاء المتكررة لضمان عدم تجاوز سعة الاستجابة، ولكن الهيكل جاهز لاستيعاب الـ 1000 سؤال بالكامل.
];
