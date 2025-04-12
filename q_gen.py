import sqlite3

# Create and connect to the database
conn = sqlite3.connect('speech_disorders_assessment.db')
cursor = conn.cursor()

# Create tables for each disorder type
cursor.execute('''CREATE TABLE IF NOT EXISTS Articulation_Disorders (
    Serial_No INTEGER PRIMARY KEY,
    Question TEXT NOT NULL
)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS Fluency_Disorders (
    Serial_No INTEGER PRIMARY KEY,
    Question TEXT NOT NULL
)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS Voice_Disorders (
    Serial_No INTEGER PRIMARY KEY,
    Question TEXT NOT NULL
)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS Language_Disorders (
    Serial_No INTEGER PRIMARY KEY,
    Question TEXT NOT NULL
)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS Motor_Speech_Disorders (
    Serial_No INTEGER PRIMARY KEY,
    Question TEXT NOT NULL
)''')

# Insert questions for all disorders
articulation_questions = [
    (1, "Produce /s/ sound for 5 seconds"),
    (2, "Repeat: 'She sells seashells'"),
    (3, "Say 'butterfly' 3 times slowly"),
    (4, "Read: 'The sixth sheik's sheep'"),
    (5, "Count from 60-70 emphasizing /s/"),
    (6, "Imitate: 'thumb' → 'sum'"),
    (7, "Describe a picture using /r/ words"),
    (8, "Produce /l/ while smiling"),
    (9, "Say 'plaque' with exaggerated lips"),
    (10, "Alternate 'pa-ta-ka' rapidly"),
    (11, "Read words with final consonants"),
    (12, "Hum then transition to vowels"),
    (13, "Recite days of week clearly"),
    (14, "Repeat 'strengths' 5 times"),
    (15, "Produce /θ/ vs /s/ contrast"),
    (16, "Describe morning routine"),
    (17, "Sing 'Happy Birthday'"),
    (18, "Whisper: 'I need help'"),
    (19, "Read numbers 1-20 quickly"),
    (20, "Produce consonant clusters")
]

fluency_questions = [
    (1, "Read news paragraph aloud"),
    (2, "Describe a stressful event"),
    (3, "Simulate phone order placement"),
    (4, "Rapid word association game"),
    (5, "Retell 'Three Little Pigs'"),
    (6, "Debate favorite season"),
    (7, "Alternate whisper/normal speech"),
    (8, "Explain computer setup steps"),
    (9, "Respond to surprise questions"),
    (10, "Read with delayed feedback"),
    (11, "Present 2-minute impromptu speech"),
    (12, "Describe abstract concepts"),
    (13, "Role-play job interview scenario"),
    (14, "Sing chorus of favorite song"),
    (15, "Narrate cooking process steps"),
    (16, "Alternate loud/soft counting numbers"),
    (17, "Explain rules of a sport you like"),
    (18, "Describe a complex image in detail"),
    (19, "Participate in group discussion on a topic"),
    (20, "React to hypothetical scenarios")
]

voice_questions = [
    (1, "Sustain /a/ for maximum duration"),
    (2, "Glide pitch from low-high-low"),
    (3, "Read CAPE-V sentences"),
    (4, "Count 1-20 with increasing loudness"),
    (5, "Produce s/z ratio"),
    (6, "Imitate siren wail"),
    (7, "Read emotional passages (angry, sad, happy)"),
    (8, "Alternate chest/head voice"),
    (9, "Produce vocal fry → falsetto"),
    (10, "Read with lateral jaw position"),
    (11, "Sing major scale ascending and descending"),
    (12, "Whisper then shout the same sentence"),
    (13, "Repeat vowel-consonant pairs such as 'ba-da-ga'"),
    (14, "Read with nose pinched to test nasal resonance"),
    (15, "Imitate animal sounds (roar, meow)"),
    (16, "Sustain /i/ with pitch shifts up and down"),
    (17, "Read while chewing imaginary gum"),
    (18, "Produce pulsed phonation patterns"),
    (19, "Alternate nasal/oral sentences"),
    (20, "Count numbers using distinct breath groups")
]

language_questions = [
    (1, "Describe cookie theft picture in detail"),
    (2, "Retell news article summary in your own words"),
    (3, "Explain 'freedom vs security'"),
    (4, "Complete complex sentences with missing parts"),
    (5, "Paraphrase common proverbs like 'A stitch in time saves nine'"),
    (6, "Sequence story cards verbally to create narrative"),
    (7, "Define abstract terms like 'justice'"),
    (8, "Respond to indirect requests"),
    (9, "Generate word associations for given prompts"),
    (10, "Correct grammatical errors in provided sentences"),
    (11, "Follow 3-step commands"),
    (12, "Create story from three unrelated words"),
    (13, "Interpret ambiguous sentences"),
    (14, "Explain multiple-meaning words"),
    (15, "Summarize technical text in simple language"),
    (16, "Debate both sides of an issue"),
    (17, "Complete sentence anagrams"),
    (18, "Identify absurd statements"),
    (19, "Translate proverbs into modern language"),
    (20, "Maintain 5-minute conversation on any topic")
]

motor_questions = [
    (1, "Repeat 'puh-tuh-kuh' rapidly"),
    (2, "Read with alternating stress"),
    (3, "Produce /i/-/a/-/u/ sequence"),
    (4, "Count with increasing loudness"),
    (5, "Alternate nasal/oral sentences"),
    (6, "Read tongue twister fast/slow"),
    (7, "Sustain fricatives progressively"),
    (8, "Imitate pitch patterns"),
    (9, "Speak while nodding head"),
    (10, "Read with bite block"),
    (11, "Alternate whisper/normal"),
    (12, "Produce speech at 50% slower rate"),
    (13, "Repeat emotional prosody"),
    (14, "Read with delayed feedback"),
    (15, "Produce contrastive stress"),
    (16, "Imitate dysarthric samples"),
    (17, "Read while chewing"),
    (18, "Produce lateralized /s/"),
    (19, "Alternate loud/soft syllables"),
    (20, "Read with artificial palate")
]

# Insert all questions into respective tables
cursor.executemany('INSERT OR IGNORE INTO Articulation_Disorders VALUES (?, ?)', articulation_questions)
cursor.executemany('INSERT OR IGNORE INTO Fluency_Disorders VALUES (?, ?)', fluency_questions)
cursor.executemany('INSERT OR IGNORE INTO Voice_Disorders VALUES (?, ?)', voice_questions)
cursor.executemany('INSERT OR IGNORE INTO Language_Disorders VALUES (?, ?)', language_questions)
cursor.executemany('INSERT OR IGNORE INTO Motor_Speech_Disorders VALUES (?, ?)', motor_questions)

# Save and close connection
conn.commit()
conn.close()
