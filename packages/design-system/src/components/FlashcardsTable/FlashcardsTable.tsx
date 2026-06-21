import styles from './FlashcardsTable.module.css';

export interface FlashcardsTableProps {
    title: string;
}

// export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(

export const FlashcardsTable = (function FlashcardsTable ({title}: FlashcardsTableProps) {
    return (
        
          <table className={styles.table}>
            {/* IDEE : faire un drop down pour afficher les résultats */}
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Flashcards</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Macronutriments</td>
                    <td>12</td>
                    <td>contenu 3</td>
                </tr>
                <tr>
                    <td>Macronutriments</td>
                    <td>12</td>
                    <td>contenu 3</td>
                </tr>
            </tbody>
          </table>
    )
})